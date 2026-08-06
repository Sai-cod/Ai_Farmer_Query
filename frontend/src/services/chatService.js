import api from './api';
import axios from 'axios';

/**
 * Service to interact with FastAPI RAG backend /ask endpoint
 * Request payload: { question: string }
 * Response data: { answer: string }
 */
export const askQuestion = async (question) => {
  try {
    // Attempt 1: Proxied API request via Vite
    const response = await api.post('/ask', { question });
    return response.data;
  } catch (error) {
    console.warn('Vite proxy request failed, attempting direct backend connection...', error);
    try {
      // Attempt 2: Direct call to http://127.0.0.1:8000/ask
      const fallbackResponse = await axios.post('http://127.0.0.1:8000/ask', { question }, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 120000
      });
      return fallbackResponse.data;
    } catch (fallbackError) {
      console.error('API Error Details:', fallbackError);
      
      if (fallbackError.code === 'ECONNABORTED' || fallbackError.message?.includes('timeout')) {
        throw new Error('AI मॉडेल उत्तर तयार करण्यासाठी जास्त वेळ घेत आहे (Timeout). कृपया २ सेकंदांनंतर पुन्हा प्रयत्न करा.');
      } else if (fallbackError.response) {
        throw new Error(fallbackError.response.data?.detail || `सर्व्हर त्रुटी (Code: ${fallbackError.response.status}). कृपया API की तपासा.`);
      } else if (fallbackError.request) {
        throw new Error('सर्व्हरशी संपर्क होऊ शकला नाही. कृपया FastAPI सर्व्हर (uvicorn app.main:app --reload) सुरू असल्याची खात्री करा.');
      } else {
        throw new Error('प्रश्नाचे उत्तर मिळवताना त्रुटी आली.');
      }
    }
  }
};
