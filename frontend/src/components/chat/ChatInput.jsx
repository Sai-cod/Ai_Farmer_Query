import React, { useState } from 'react';
import { LuSend, LuMic } from 'react-icons/lu';
import { STRINGS } from '../../constants/strings';

const ChatInput = ({ onSend, disabled = false }) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleMicClick = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('तुमच्या ब्राउझरमध्ये व्हॉईस इनपुट सपोर्ट उपलब्ध नाही.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'mr-IN';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => (prev ? prev + ' ' + transcript : transcript));
    };

    recognition.start();
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="flex items-center gap-2 p-2 bg-white rounded-2xl border border-gray-200 shadow-lg focus-within:border-[#2E7D32] focus-within:ring-4 focus-within:ring-[#4CAF50]/20 transition-all">
        {/* Voice Input Button */}
        <button
          type="button"
          onClick={handleMicClick}
          title="बोलून टाईप करा"
          className={`p-3 rounded-xl transition-all ${
            isListening
              ? 'bg-red-500 text-white animate-pulse'
              : 'text-[#2E7D32] hover:bg-[#E8F5E9]'
          }`}
        >
          <LuMic className="w-5 h-5" />
        </button>

        {/* Input Text Area / Input Box */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={STRINGS.chatPlaceholder}
          disabled={disabled}
          className="flex-1 bg-transparent text-[#333333] placeholder-gray-400 focus:outline-none text-sm sm:text-base font-marathi px-2 py-1"
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!input.trim() || disabled}
          className="flex items-center gap-2 px-5 py-3 bg-[#2E7D32] hover:bg-[#1B5E20] disabled:bg-gray-200 text-white rounded-xl font-semibold text-sm transition-all duration-200 shadow-md active:scale-95 disabled:cursor-not-allowed font-marathi shrink-0"
        >
          <span>{STRINGS.sendBtn}</span>
          <LuSend className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
