import api from './api';

export const getDocuments = async () => {
  const response = await api.get('/rag/documents');
  return response.data;
};

export const addDocument = async (documentData) => {
  const response = await api.post('/rag/documents', documentData);
  return response.data;
};

export const deleteDocument = async (documentId) => {
  const response = await api.delete(`/rag/documents/${documentId}`);
  return response.data;
};

export const searchDocuments = async (query) => {
  const response = await api.post('/rag/search', { query });
  return response.data;
};
