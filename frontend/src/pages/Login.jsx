import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuPhone, LuLock, LuSprout, LuArrowRight } from 'react-icons/lu';
import { STRINGS } from '../constants/strings';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { setUser } from '../utils/helpers';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mobile: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.mobile || formData.mobile.trim().length < 10) {
      newErrors.mobile = STRINGS.invalidMobile;
    }
    if (!formData.password || formData.password.length < 4) {
      newErrors.password = 'कृपया पासवर्ड प्रविष्ट करा';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate login session & save to local state
    setTimeout(() => {
      setUser({
        mobile: formData.mobile,
        fullName: 'बळीराजा शेतकरी',
        village: 'महाराष्ट्र',
      });
      setLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#4CAF50] relative overflow-hidden">
      {/* Decorative Agriculture Leaf/Sun BG Elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 relative z-10 animate-fade-in">
        {/* Logo & Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#2E7D32] to-[#4CAF50] text-white flex items-center justify-center shadow-lg mb-4 hover:scale-105 transition-transform">
            <LuSprout className="w-10 h-10" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2E7D32] font-marathi">
            {STRINGS.appName}
          </h1>
          <p className="text-gray-500 text-sm font-marathi mt-1">
            {STRINGS.tagline}
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label={STRINGS.mobileNumber}
            name="mobile"
            type="tel"
            maxLength={10}
            value={formData.mobile}
            onChange={handleChange}
            placeholder={STRINGS.mobilePlaceholder}
            icon={LuPhone}
            error={errors.mobile}
            required
          />

          <Input
            label={STRINGS.password}
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={STRINGS.passwordPlaceholder}
            icon={LuLock}
            error={errors.password}
            required
          />

          <Button
            type="submit"
            size="lg"
            isLoading={loading}
            className="w-full mt-2 font-marathi text-lg shadow-lg"
          >
            <span>{STRINGS.login}</span>
            <LuArrowRight className="w-5 h-5 ml-1" />
          </Button>
        </form>

        {/* Register Redirect Link */}
        <div className="mt-8 text-center pt-6 border-t border-gray-100">
          <Link
            to="/register"
            className="text-sm font-semibold text-[#2E7D32] hover:text-[#1B5E20] font-marathi hover:underline transition-all"
          >
            {STRINGS.dontHaveAccount}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
