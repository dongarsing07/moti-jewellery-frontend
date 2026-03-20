import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 gap-6">
        <Link to="/admin/add" className="bg-green-500 text-white p-6 rounded-xl text-center">
          ➕ Add Product
        </Link>

        <Link to="/admin/manage">
  📦 Manage Products
</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;