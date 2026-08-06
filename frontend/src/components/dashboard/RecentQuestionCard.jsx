import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LuMessageSquare, LuChevronRight, LuPlus } from 'react-icons/lu';
import { STRINGS } from '../../constants/strings';
import Card from '../common/Card';

const RecentQuestionCard = ({ questions = [] }) => {
  const navigate = useNavigate();

  const handleAskQuestion = (questionText = '') => {
    navigate('/chat', { state: { prefill: questionText } });
  };

  return (
    <Card hover={false} className="w-full">
      <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#E8F5E9] text-[#2E7D32] rounded-xl">
            <LuMessageSquare className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-[#333333] font-marathi">
            {STRINGS.recentQuestionsTitle}
          </h3>
        </div>
        <button
          onClick={() => handleAskQuestion()}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#2E7D32] hover:text-[#1B5E20] font-marathi"
        >
          <LuPlus className="w-4 h-4" />
          <span>{STRINGS.askQuestionBtn}</span>
        </button>
      </div>

      {questions.length === 0 ? (
        <div className="text-center py-8 text-gray-500 font-marathi">
          <p>{STRINGS.noRecentQuestions}</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-50">
          {questions.map((q) => (
            <div
              key={q.id}
              onClick={() => handleAskQuestion(q.question)}
              className="py-3 px-2 flex items-center justify-between hover:bg-[#E8F5E9]/50 rounded-xl transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 pr-2">
                <div className="w-2 h-2 rounded-full bg-[#4CAF50]"></div>
                <p className="text-sm sm:text-base text-gray-700 font-medium font-marathi group-hover:text-[#2E7D32]">
                  {q.question}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 font-marathi shrink-0">
                <span>{q.time}</span>
                <LuChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#2E7D32] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default RecentQuestionCard;
