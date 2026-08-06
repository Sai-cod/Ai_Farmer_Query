import React, { useEffect, useRef } from 'react';
import { LuSprout, LuMessageSquare, LuSparkles } from 'react-icons/lu';
import { STRINGS } from '../../constants/strings';
import ChatMessage from './ChatMessage';

const ChatWindow = ({ messages = [], loading = false, onSelectPreset }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex-1 flex flex-col justify-between overflow-y-auto p-4 sm:p-6 space-y-4">
      {/* Empty State / Welcome Header */}
      {messages.length === 0 ? (
        <div className="my-auto flex flex-col items-center justify-center text-center max-w-lg mx-auto py-8">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#2E7D32] to-[#4CAF50] text-white flex items-center justify-center shadow-lg mb-4">
            <LuSprout className="w-10 h-10 animate-bounce" />
          </div>
          <h2 className="text-2xl font-bold text-[#2E7D32] font-marathi mb-2">
            {STRINGS.welcomeFarmer}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base font-marathi leading-relaxed mb-6">
            शेतीविषयक कोणतीही अडचण किंवा प्रश्न इथे विचारा. आमची AI प्रणाली तुम्हाला त्वरित शास्त्रीय मार्गदर्शन करेल.
          </p>

          {/* Preset Questions Chips */}
          <div className="w-full text-left">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 font-marathi flex items-center gap-1.5">
              <LuSparkles className="w-4 h-4 text-[#4CAF50]" />
              {STRINGS.quickQuestionsTitle}
            </p>
            <div className="flex flex-col gap-2">
              {STRINGS.sampleQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => onSelectPreset(query)}
                  className="p-3 bg-white hover:bg-[#E8F5E9] border border-gray-200 hover:border-[#4CAF50] rounded-xl text-left text-sm font-medium text-gray-700 hover:text-[#2E7D32] transition-all shadow-sm flex items-center justify-between group font-marathi"
                >
                  <span>{query}</span>
                  <LuMessageSquare className="w-4 h-4 text-gray-400 group-hover:text-[#2E7D32] shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </div>
      )}

      {/* Typing Indicator */}
      {loading && (
        <div className="flex items-center gap-3 my-2 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-xs animate-pulse">
          <div className="w-8 h-8 rounded-xl bg-[#4CAF50] text-white flex items-center justify-center">
            <LuSprout className="w-5 h-5 animate-spin" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#2E7D32] font-marathi">{STRINGS.appName}</span>
            <div className="flex items-center gap-1 mt-1">
              <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-[#4CAF50] animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-xs text-gray-500 font-marathi ml-2">{STRINGS.typingIndicator}</span>
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;
