// Helper utilities for local state and formatting

export const getUser = () => {
  try {
    const userStr = localStorage.getItem('ai_farmer_user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (e) {
    return null;
  }
};

export const setUser = (userData) => {
  localStorage.setItem('ai_farmer_user', JSON.stringify(userData));
};

export const removeUser = () => {
  localStorage.removeItem('ai_farmer_user');
};

export const getStoredQuestions = () => {
  try {
    const qStr = localStorage.getItem('ai_farmer_recent_q');
    return qStr ? JSON.parse(qStr) : [
      { id: 1, question: 'सोयाबीन बियाण्यांवर बीजोपचार कसा करावा?', time: '२ तासांपूर्वी' },
      { id: 2, question: 'कापूस पिकावरील मावा रोगावर उपाय काय?', time: 'काल' }
    ];
  } catch (e) {
    return [];
  }
};

export const saveStoredQuestion = (questionText) => {
  try {
    const list = getStoredQuestions();
    const newItem = {
      id: Date.now(),
      question: questionText,
      time: 'आत्ताच'
    };
    const updated = [newItem, ...list.filter(q => q.question !== questionText)].slice(0, 5);
    localStorage.setItem('ai_farmer_recent_q', JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
};

export const formatMarathiTime = (dateObj = new Date()) => {
  return dateObj.toLocaleTimeString('mr-IN', { hour: '2-digit', minute: '2-digit' });
};
