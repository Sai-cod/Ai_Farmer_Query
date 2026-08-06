import React, { useState } from 'react';
import { LuUser, LuSprout, LuCopy, LuCheck, LuVolume2 } from 'react-icons/lu';
import { formatMarathiTime } from '../../utils/helpers';

const ChatMessage = ({ message }) => {
  const isUser = message.sender === 'user';
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (speaking) {
        setSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(message.text);
      utterance.lang = 'mr-IN';
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      setSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={`flex gap-3 my-4 ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end`}>
      {/* Avatar */}
      <div
        className={`w-9 h-9 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-sm ${
          isUser ? 'bg-[#2E7D32]' : 'bg-gradient-to-tr from-[#388E3C] to-[#4CAF50]'
        }`}
      >
        {isUser ? <LuUser className="w-5 h-5" /> : <LuSprout className="w-5 h-5" />}
      </div>

      {/* Bubble Container */}
      <div className={`max-w-[85%] sm:max-w-[75%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`relative p-4 sm:p-5 rounded-2xl shadow-sm font-marathi leading-relaxed text-sm sm:text-base transition-all ${
            isUser
              ? 'bg-[#2E7D32] text-white rounded-br-none'
              : 'bg-white text-[#333333] border-l-4 border-[#4CAF50] rounded-bl-none shadow-soft'
          }`}
        >
          <div className="whitespace-pre-wrap break-words">{message.text}</div>

          {/* AI Helper Bar (Copy & Speak) */}
          {!isUser && (
            <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between gap-4 text-xs text-gray-500">
              <span className="text-[11px] text-gray-400">AI कृषी सल्लागार</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSpeak}
                  title="एकवा (Listen)"
                  className={`p-1.5 rounded-lg hover:bg-gray-100 transition-colors ${
                    speaking ? 'text-[#2E7D32] bg-emerald-50' : 'text-gray-500'
                  }`}
                >
                  <LuVolume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCopy}
                  title="कॉपी करा"
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                >
                  {copied ? <LuCheck className="w-4 h-4 text-emerald-600" /> : <LuCopy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Timestamp */}
        <span className="text-[11px] text-gray-400 mt-1 px-1 font-marathi">
          {message.timestamp || formatMarathiTime()}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
