import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeCard from '../components/dashboard/WelcomeCard';
import FeatureCard from '../components/dashboard/FeatureCard';
import RecentQuestionCard from '../components/dashboard/RecentQuestionCard';
import { STRINGS } from '../constants/strings';
import { getStoredQuestions } from '../utils/helpers';

const Dashboard = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions(getStoredQuestions());
  }, []);

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Card Banner */}
      <WelcomeCard />

      {/* Four Feature Cards Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[#333333] font-marathi flex items-center gap-2">
          <span>कृषी सेवा व वैशिष्ट्ये</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: AI Assistant (Active) */}
          <FeatureCard
            icon="🤖"
            title={STRINGS.features.aiAssistant.title}
            description={STRINGS.features.aiAssistant.desc}
            buttonText={STRINGS.features.aiAssistant.btn}
            disabled={false}
            onClick={() => navigate('/chat')}
          />

          {/* Card 2: Weather (Disabled) */}
          <FeatureCard
            icon="🌦"
            title={STRINGS.features.weather.title}
            description={STRINGS.features.weather.desc}
            badgeText={STRINGS.features.weather.badge}
            disabled={true}
          />

          {/* Card 3: Disease Identifier (Disabled) */}
          <FeatureCard
            icon="🌱"
            title={STRINGS.features.disease.title}
            description={STRINGS.features.disease.desc}
            badgeText={STRINGS.features.disease.badge}
            disabled={true}
          />

          {/* Card 4: Govt Schemes (Disabled) */}
          <FeatureCard
            icon="📢"
            title={STRINGS.features.schemes.title}
            description={STRINGS.features.schemes.desc}
            badgeText={STRINGS.features.schemes.badge}
            disabled={true}
          />
        </div>
      </div>

      {/* Recent Questions Section */}
      <div className="pt-2">
        <RecentQuestionCard questions={questions} />
      </div>
    </div>
  );
};

export default Dashboard;
