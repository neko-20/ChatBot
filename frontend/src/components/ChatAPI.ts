import axios from 'axios';

export const chatMessage = async (message: string) => {
  try {
    const response = await axios.post('/api/generate', {
      text: message,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
