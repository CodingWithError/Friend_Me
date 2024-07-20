document.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.getElementById('chat-form');
  const userMessageInput = document.getElementById('user-message');
  const messagesDiv = document.getElementById('messages');

  chatForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const userMessage = userMessageInput.value.trim();
    if (!userMessage) return;

    addMessageToChat('You', userMessage, 'user');
    userMessageInput.value = '';

    try {
      const response = await sendMessageToAPI(userMessage);
      addMessageToChat('Bot', response, 'bot');
    } catch (error) {
      console.error('Error sending message to API:', error);
      addMessageToChat('Error', 'Unable to get a response from the server. Please try again later.', 'error');
    }
  });

  function addMessageToChat(sender, message, className) {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    messageElement.classList.add('message', className);
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
});

async function sendMessageToAPI(message) {
  try {
    const response = await fetch('http://localhost:3002/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Network or parsing error:', error);
    throw new Error('Failed to communicate with the server. Please check your connection and try again.');
  }
}