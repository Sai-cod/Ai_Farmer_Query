import React from 'react';
import { Link } from 'react-router-dom';
import { LuInfo, LuHouse } from 'react-icons/lu';
import { STRINGS } from '../constants/strings';

const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#F5F7FA]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center space-y-6">
        <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-3xl flex items-center justify-center mx-auto">
          <LuInfo className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-[#2E7D32] font-marathi">
            {STRINGS.notFoundTitle}
          </h1>
          <p className="text-gray-600 font-marathi mt-2 text-base">
            {STRINGS.notFoundDesc}
          </p>
        </div>
        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl font-bold font-marathi shadow-md hover:shadow-lg transition-all"
        >
          <LuHouse className="w-5 h-5" />
          <span>{STRINGS.backToDashboard}</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
