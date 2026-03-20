import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Camera, RefreshCw, Download, Sparkles, X } from 'lucide-react';

const VirtualTryOn = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedJewellery, setSelectedJewellery] = useState(null);
  const [jewelleryPosition, setJewelleryPosition] = useState({ x: 0, y: 0 });
  const [jewellerySize, setJewellerySize] = useState(100);
  const [showControls, setShowControls] = useState(false);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const jewelleryItems = [
    {
      id: 1,
      name: "Mayur Short Mangalsutra",
      category: "Mangalsutra",
      image: "/src/assets/images/mayur-short-mangalsutra.png",
      preview: "mangalsutra"
    },
    {
      id: 2,
      name: "Saraswati Mangalsutra",
      category: "Mangalsutra",
      image: "/src/assets/images/saraswati-mangalsutra.png",
      preview: "mangalsutra"
    },
    {
      id: 3,
      name: "Ad Stone Nath",
      category: "Nath",
      image: "/src/assets/images/ad-stone-nath.png",
      preview: "nath"
    },
    {
      id: 4,
      name: "Mayur Set",
      category: "Necklace Sets",
      image: "/src/assets/images/mayur-set.png",
      preview: "necklace"
    },
    {
      id: 5,
      name: "Parijatak Set",
      category: "Necklace Sets",
      image: "/src/assets/images/parijatak.png",
      preview: "necklace"
    },
    {
      id: 6,
      name: "Traditional Moti Bangles",
      category: "Bangles",
      image: "/src/assets/images/bangles.png",
      preview: "bangles"
    }
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setShowControls(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleJewellerySelect = (item) => {
    setSelectedJewellery(item);
    // Reset position for new jewellery
    if (item.category === "Nath") {
      setJewelleryPosition({ x: 0, y: -50 }); // Nose position
    } else if (item.category === "Mangalsutra") {
      setJewelleryPosition({ x: 0, y: 30 }); // Neck position
    } else {
      setJewelleryPosition({ x: 0, y: 0 });
    }
  };

  const handleDrag = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setJewelleryPosition({ x, y });
  };

  const handleSizeChange = (e) => {
    setJewellerySize(e.target.value);
  };

  const resetPosition = () => {
    setJewelleryPosition({ x: 0, y: 0 });
    setJewellerySize(100);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setSelectedJewellery(null);
    setShowControls(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'my-tryon.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-pinkBg to-soft">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4"
          >
            Virtual Try-On
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90"
          >
            Upload your photo and see how our jewellery looks on you!
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Jewellery Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <h2 className="text-2xl font-playfair font-bold mb-4 text-secondary">
                Select Jewellery
              </h2>
              
              {/* Categories Filter */}
              <div className="space-y-4">
                {['All', 'Mangalsutra', 'Nath', 'Necklace Sets', 'Bangles'].map(cat => (
                  <button
                    key={cat}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-soft transition"
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Jewellery Grid */}
              <div className="mt-6 space-y-3 max-h-96 overflow-y-auto">
                {jewelleryItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleJewellerySelect(item)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl transition ${
                      selectedJewellery?.id === item.id 
                        ? 'bg-secondary text-white' 
                        : 'hover:bg-soft'
                    }`}
                  >
                    <div className="w-12 h-12 bg-soft rounded-lg overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <p className={`font-medium ${
                        selectedJewellery?.id === item.id ? 'text-white' : 'text-textDark'
                      }`}>
                        {item.name}
                      </p>
                      <p className={`text-sm ${
                        selectedJewellery?.id === item.id ? 'text-white/80' : 'text-textDark/60'
                      }`}>
                        {item.category}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Try-On Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              {/* Image Upload Area */}
              {!selectedImage ? (
                <div 
                  onClick={() => fileInputRef.current.click()}
                  className="border-3 border-dashed border-primary/30 rounded-2xl p-16 text-center cursor-pointer hover:border-primary transition group"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Upload className="w-16 h-16 mx-auto text-primary/50 group-hover:text-primary mb-4" />
                  <p className="text-xl font-medium text-textDark mb-2">
                    Upload Your Photo
                  </p>
                  <p className="text-textDark/60">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-textDark/40 mt-4">
                    Supported: JPG, PNG (Max 5MB)
                  </p>
                </div>
              ) : (
                <div>
                  {/* Canvas for Try-On */}
                  <div className="relative rounded-2xl overflow-hidden bg-soft">
                    <canvas
                      ref={canvasRef}
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                    
                    {/* Image with Jewellery Overlay */}
                    <div className="relative">
                      <img 
                        src={selectedImage} 
                        alt="Your photo"
                        className="w-full h-auto"
                      />
                      
                      {selectedJewellery && (
                        <img 
                          src={selectedJewellery.image}
                          alt={selectedJewellery.name}
                          className="absolute cursor-move"
                          style={{
                            left: `calc(50% + ${jewelleryPosition.x}px)`,
                            top: `calc(50% + ${jewelleryPosition.y}px)`,
                            transform: `translate(-50%, -50%) scale(${jewellerySize/100})`,
                            width: 'auto',
                            height: 'auto',
                            maxWidth: '200px',
                            maxHeight: '200px',
                            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
                          }}
                          draggable
                          onDragEnd={handleDrag}
                        />
                      )}
                    </div>

                    {/* Controls */}
                    {showControls && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur rounded-full shadow-lg px-4 py-2 flex items-center space-x-4">
                        <button
                          onClick={resetPosition}
                          className="p-2 hover:bg-soft rounded-full transition"
                          title="Reset Position"
                        >
                          <RefreshCw className="w-5 h-5 text-secondary" />
                        </button>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-textDark">Size:</span>
                          <input
                            type="range"
                            min="50"
                            max="200"
                            value={jewellerySize}
                            onChange={handleSizeChange}
                            className="w-24"
                          />
                        </div>

                        <button
                          onClick={downloadImage}
                          className="p-2 hover:bg-soft rounded-full transition"
                          title="Download"
                        >
                          <Download className="w-5 h-5 text-secondary" />
                        </button>

                        <button
                          onClick={clearImage}
                          className="p-2 hover:bg-soft rounded-full transition"
                          title="Clear"
                        >
                          <X className="w-5 h-5 text-red-500" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Instructions */}
                  <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-textDark/60">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                      Drag jewellery to adjust position
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      Use slider to resize
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Tips */}
              <div className="mt-6 bg-soft rounded-xl p-4">
                <h3 className="font-semibold mb-2 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-secondary" />
                  Tips for Best Results:
                </h3>
                <ul className="text-sm text-textDark/70 space-y-1">
                  <li>• Use a clear front-facing photo</li>
                  <li>• Good lighting helps see details better</li>
                  <li>• Drag jewellery to the correct position</li>
                  <li>• Adjust size to match your face/neck</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;