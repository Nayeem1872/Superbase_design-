
import React from 'react';
import { ShoppingBag, Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="bg-white px-4 sm:px-8 md:px-12 py-4 sm:py-6 flex items-center justify-between border-b border-gray-100 shadow-[0px_1px_4px_rgba(0,0,0,0.08)] sticky top-0 z-50">
      <div className="flex items-center justify-between w-full max-w-[1200px] mx-auto">
        <div className="flex items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            <img src="/logo.png" alt="Super Base Logo" className="w-[139.87px] h-[45px] object-contain" />
          </div>
        </div>

        <nav className="hidden lg:flex items-center space-x-10 text-sm font-semibold tracking-wide">
          <a href="#" className="text-[#555555] hover:text-[#5D06E9] transition-colors">HOME</a>
          <a href="#" className="text-[#070012] pb-1">PROGRAMS & SERVICES</a>
          <a href="#" className="text-[#555555] hover:text-[#5D06E9] transition-colors">ABOUT</a>
          <a href="#" className="text-[#555555] hover:text-[#5D06E9] transition-colors">CONTACT</a>
        </nav>

        <div className="flex items-center gap-3 sm:gap-8">
          <button className="text-[#070012] relative group p-2">
            <ShoppingBag size={22} strokeWidth={1.5} className="sm:w-[24px] sm:h-[24px]" />
            <span className="absolute top-1 right-1 bg-[#5D06E9] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
          </button>
          <button className="btn-gradient text-white px-4 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold text-xs sm:text-sm shadow-md hover:scale-[1.02] active:scale-95 transition-all">
            SIGN IN
          </button>
          <button className="lg:hidden p-2 text-gray-400">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
