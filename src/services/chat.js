import api from './api';

export const getMessages = async () => {
  const response = await api.get('/chat');
  return response.data;
};

export const sendMessage = async (message) => {
  const response = await api.post('/chat', { message });
  return response.data;
};
