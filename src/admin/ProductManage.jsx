import React, { useEffect, useState } from 'react';

const Productmanage = () => {
  const [products, setProducts] = useState([]);

  // Load products from localStorage
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  // Delete product
  const handleDelete = (id) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

      {products.length === 0 ? (
        <p>No products found ❌</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-xl shadow">
              
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-3"
              />

              <h2 className="font-bold text-lg">{product.name}</h2>
              <p className="text-sm text-gray-500">{product.category}</p>

              <button
                onClick={() => handleDelete(product.id)}
                className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Productmanage;