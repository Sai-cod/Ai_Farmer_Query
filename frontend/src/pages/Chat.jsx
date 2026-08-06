import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LuArrowLeft, LuTrash2, LuSprout, LuRefreshCw } from 'react-icons/lu';
import { STRINGS } from '../constants/strings';
import ChatWindow from '../components/chat/ChatWindow';
import ChatInput from '../components/chat/ChatInput';
import { askQuestion } from '../services/chatService';
import { saveStoredQuestion, formatMarathiTime } from '../utils/helpers';

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'नमस्कार शेतकरी मित्र! मी तुमचा AI कृषी सहाय्यक आहे. पीक संवर्धन, बियाणे, खते, कीड किंवा रोगाविषयी तुम्हाला काहीही विचारायचे असल्यास येथे प्रश्न लिहा.',
      timestamp: formatMarathiTime(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle prefilled question passed from Dashboard if any
  useEffect(() => {
    if (location.state?.prefill) {
      handleSendMessage(location.state.prefill);
      // Clear state so re-renders won't resend
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSendMessage = async (text) => {
    if (!text.trim() || loading) return;

    setErrorMsg('');
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      timestamp: formatMarathiTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    saveStoredQuestion(text);
    setLoading(true);

    try {
      // Call FastAPI backend /ask
      const response = await askQuestion(text);
      
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: response.answer || 'माफ करा, उत्तर उपलब्ध होऊ शकले नाही.',
        timestamp: formatMarathiTime(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
      const errorResponseMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: `⚠️ ${err.message}`,
        timestamp: formatMarathiTime(),
      };
      setMessages((prev) => [...prev, errorResponseMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'ai',
        text: 'संवाद रिसेट केला गेला आहे. नवीन प्रश्न विचारा.',
        timestamp: formatMarathiTime(),
      },
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] max-w-5xl mx-auto bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden my-2">
      {/* Chat Header Bar */}
      <div className="px-6 py-4 bg-gradient-to-r from-[#2E7D32] to-[#388E3C] text-white flex items-center justify-between shrink-0 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="मुख्य पृष्ठावर जा"
          >
            <LuArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <LuSprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg font-marathi leading-tight">
                {STRINGS.chatHeader}
              </h2>
              <p className="text-xs text-emerald-100 font-marathi flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>ऑनलाइन सहाय्यक सक्रिय</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClearChat}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold font-marathi transition-colors"
            title="चॅट साफ करा"
          >
            <LuRefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">नवीन संवाद</span>
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 overflow-hidden flex flex-col bg-[#F5F7FA]">
        <ChatWindow
          messages={messages}
          loading={loading}
          onSelectPreset={handleSendMessage}
        />
      </div>

      {/* Chat Input Section */}
      <div className="p-4 bg-white border-t border-gray-100 shrink-0">
        <ChatInput onSend={handleSendMessage} disabled={loading} />
      </div>
    </div>
  );
};

export default Chat;
