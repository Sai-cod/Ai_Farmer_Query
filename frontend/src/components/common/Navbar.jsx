import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LuSprout, LuLogOut, LuMessageSquare, LuLayoutDashboard, LuUser } from 'react-icons/lu';
import { STRINGS } from '../../constants/strings';
import { getUser, removeUser } from '../../utils/helpers';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();

  const handleLogout = () => {
    removeUser();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between py-3">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#2E7D32] to-[#4CAF50] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200">
            <LuSprout className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#2E7D32] leading-tight font-marathi tracking-wide">
              {STRINGS.appName}
            </h1>
            <p className="text-xs text-gray-500 font-marathi font-medium">
              {STRINGS.appSubTitle}
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          <Link
            to="/dashboard"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              isActive('/dashboard')
                ? 'bg-[#E8F5E9] text-[#2E7D32]'
                : 'text-gray-600 hover:text-[#2E7D32] hover:bg-gray-50'
            }`}
          >
            <LuLayoutDashboard className="w-4 h-4" />
            {STRINGS.dashboard}
          </Link>
          <Link
            to="/chat"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              isActive('/chat')
                ? 'bg-[#E8F5E9] text-[#2E7D32]'
                : 'text-gray-600 hover:text-[#2E7D32] hover:bg-gray-50'
            }`}
          >
            <LuMessageSquare className="w-4 h-4" />
            {STRINGS.chat}
          </Link>
        </nav>

        {/* User Badge & Logout */}
        <div className="flex items-center gap-3">
          {user && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200 text-xs text-gray-700">
              <div className="w-6 h-6 rounded-full bg-[#4CAF50] text-white flex items-center justify-center font-bold">
                <LuUser className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold font-marathi">{user.fullName || 'शेतकरी मित्र'}</span>
              {user.village && <span className="text-gray-400">({user.village})</span>}
            </div>
          )}

          <button
            onClick={handleLogout}
            title={STRINGS.logout}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-all border border-red-100"
          >
            <LuLogOut className="w-4 h-4" />
            <span className="hidden sm:inline font-marathi">{STRINGS.logout}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
