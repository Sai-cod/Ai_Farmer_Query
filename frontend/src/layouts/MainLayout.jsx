import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-gray-100 py-4 text-center text-xs text-gray-500 font-marathi">
        © 2026 AI शेतकरी सहाय्यक प्रणाली | सर्व हक्क सुरक्षित 🌾
      </footer>
    </div>
  );
};

export default MainLayout;
