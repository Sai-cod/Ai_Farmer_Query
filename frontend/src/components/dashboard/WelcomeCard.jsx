import React from 'react';
import { LuSprout, LuSun, LuWheat } from 'react-icons/lu';
import { STRINGS } from '../../constants/strings';
import { getUser } from '../../utils/helpers';

const WelcomeCard = () => {
  const user = getUser();
  const name = user?.fullName ? user.fullName : 'बळीराजा';

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#2E7D32] via-[#388E3C] to-[#4CAF50] p-6 sm:p-8 text-white shadow-xl">
      {/* Background Decorative Patterns */}
      <div className="absolute -right-8 -bottom-10 opacity-15 pointer-events-none">
        <LuWheat className="w-64 h-64 text-white" />
      </div>
      <div className="absolute right-20 top-4 opacity-20 pointer-events-none">
        <LuSun className="w-24 h-24 text-yellow-200 animate-spin-slow" />
      </div>

      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold tracking-wide uppercase mb-3">
          <LuSprout className="w-4 h-4 text-emerald-200" />
          <span>कृषी तंत्रज्ञानाचा स्मार्ट पर्याय</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-marathi mb-2">
          {STRINGS.welcome}, {name}! 🚜
        </h2>
        <p className="text-emerald-50 text-base sm:text-lg font-marathi font-medium leading-relaxed opacity-95">
          तुमच्या शेतातील पिके, खते, रोग आणि किडीविषयी कोणत्याही प्रश्नाचे उत्तरे मिळवण्यासाठी आपल्या AI सहाय्यकाचा वापर करा.
        </p>
      </div>
    </div>
  );
};

export default WelcomeCard;
