import axios from 'axios';

const sendTelegramNotification = async (message: string) => {
  const botToken = '6920279510:AAENn8J_tq_k8UqugVMCE7KwECeAKMz0Fj8';
  const chatId = '6051713331';

  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    await axios.post(apiUrl, {
      chat_id: chatId,
      text: message,
    });
    console.log('Notification sent successfully');
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

export default sendTelegramNotification;
