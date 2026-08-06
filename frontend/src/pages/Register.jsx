import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuUser, LuPhone, LuMapPin, LuLock, LuSprout, LuCheck } from 'react-icons/lu';
import { STRINGS } from '../constants/strings';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { setUser } from '../utils/helpers';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    village: '',
    password: '',
    confirmPassword: '',
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
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'कृपया संपूर्ण नाव प्रविष्ट करा';
    }
    if (!formData.mobile || formData.mobile.trim().length < 10) {
      newErrors.mobile = STRINGS.invalidMobile;
    }
    if (!formData.village.trim()) {
      newErrors.village = 'कृपया गावाचे नाव प्रविष्ट करा';
    }
    if (!formData.password || formData.password.length < 4) {
      newErrors.password = 'पासवर्ड किमान ४ अक्षरांचा असावा';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = STRINGS.passwordMismatch;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setUser({
        fullName: formData.fullName,
        mobile: formData.mobile,
        village: formData.village,
      });
      setLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#4CAF50] relative overflow-hidden my-auto">
      {/* Decorative BG Elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 relative z-10 my-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#2E7D32] to-[#4CAF50] text-white flex items-center justify-center shadow-lg mb-3">
            <LuSprout className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#2E7D32] font-marathi">
            शेतकरी खात्याची {STRINGS.register}
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm font-marathi mt-1">
            कृषी सहाय्यक सेवेचा लाभ घेण्यासाठी नोंदणी करा
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={STRINGS.fullName}
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder={STRINGS.fullNamePlaceholder}
            icon={LuUser}
            error={errors.fullName}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label={STRINGS.mobileNumber}
              name="mobile"
              type="tel"
              maxLength={10}
              value={formData.mobile}
              onChange={handleChange}
              placeholder="१० अंकी क्रमांक"
              icon={LuPhone}
              error={errors.mobile}
              required
            />

            <Input
              label={STRINGS.village}
              name="village"
              value={formData.village}
              onChange={handleChange}
              placeholder={STRINGS.villagePlaceholder}
              icon={LuMapPin}
              error={errors.village}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            <Input
              label={STRINGS.confirmPassword}
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="पासवर्ड पुन्हा टाका"
              icon={LuLock}
              error={errors.confirmPassword}
              required
            />
          </div>

          <Button
            type="submit"
            size="lg"
            isLoading={loading}
            className="w-full mt-2 font-marathi text-lg shadow-lg"
          >
            <LuCheck className="w-5 h-5 mr-1" />
            <span>{STRINGS.register}</span>
          </Button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center pt-4 border-t border-gray-100">
          <Link
            to="/"
            className="text-sm font-semibold text-[#2E7D32] hover:text-[#1B5E20] font-marathi hover:underline transition-all"
          >
            {STRINGS.alreadyHaveAccount}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
