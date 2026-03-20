import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary/10 text-gray-800 border-t border-pinkLight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-playfair font-bold mb-4">
              <span className="text-primary">Moti</span> <span className="text-secondary">Heritage</span>
            </h3>
            <p className="text-gray-600 mb-4">
              Handcrafted Moti jewellery preserving the legacy of traditional Indian craftsmanship since 2014.
            </p>
            <div className="flex space-x-4">
              {/* Instagram Link */}
              <a 
                href="https://www.instagram.com/handmade_moti_jewellery5" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              {/* WhatsApp Group Invitation Link */}
              <a 
                href="https://chat.whatsapp.com/Ism0qTyqmdvISuW63IsCXN?mode=gi_t" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-600 transition"
                aria-label="WhatsApp Group"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
            {/* Optional: display Instagram username for easy copy */}
            <p className="text-xs text-gray-500 mt-2">
              Instagram: <span className="font-medium">@handmade_moti_jewellery5</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary transition">About Us</Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-primary transition">Shop</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary transition">Contact</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-primary transition">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/category/mangalsutra" className="text-gray-600 hover:text-primary transition">Mangalsutra</Link>
              </li>
              <li>
                <Link to="/category/nath" className="text-gray-600 hover:text-primary transition">Nath</Link>
              </li>
              <li>
                <Link to="/category/necklace-sets" className="text-gray-600 hover:text-primary transition">Necklace Sets</Link>
              </li>
              <li>
                <Link to="/category/bangles" className="text-gray-600 hover:text-primary transition">Bangles</Link>
              </li>
              <li>
                <Link to="/category/rangoli-mats" className="text-gray-600 hover:text-primary transition">Rangoli Mats</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <span className="text-gray-600">Yashraj Appartment Rahata (Shirdi) dis. Ahilyanagar, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-gray-600">+91 7756025758</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-gray-600">pravinlaxmanmahale@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-pinkLight mt-12 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Moti Heritage. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;