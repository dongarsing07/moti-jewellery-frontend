import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    category: '',
    description: '',
    image: ''
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let products = JSON.parse(localStorage.getItem('products')) || [];
    product.id = Date.now();

    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));

    alert("Product Added ✅");
    navigate('/admin/manage');
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl mb-4">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Product Name" onChange={handleChange} className="border p-2 w-full" />
        <input name="category" placeholder="Category" onChange={handleChange} className="border p-2 w-full" />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="border p-2 w-full" />
        <input name="image" placeholder="Image URL" onChange={handleChange} className="border p-2 w-full" />

        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;