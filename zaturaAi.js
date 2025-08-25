document.addEventListener('DOMContentLoaded', function() {
  const chatMessages = document.getElementById('chat-messages');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');

  function addMessage(text, className) {
    const message = document.createElement('div');
    message.textContent = text;
    message.classList.add('message', className);
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

 async function getBotResponse(message) {
  const response = await fetch('Base de Datos/validarai.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ message }),
  });
  
  const text = await response.text();
  console.log('Respuesta raw:', text);

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error('Error parseando JSON:', error);
    return { answer: 'Error: La respuesta no es JSON válido.' };
  }
}


  async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === '') return;

    addMessage(userMessage, 'user-message');
    userInput.value = '';

    const botResponse = await getBotResponse(userMessage);
    addMessage(botResponse.answer, 'bot-message');

    if (botResponse.image) {
      const img = document.createElement('img');
      img.src = botResponse.image;
      img.alt = 'Imagen relacionada';
      img.style.maxWidth = '200px';
      img.style.display = 'block';
      img.style.marginTop = '5px';
      chatMessages.appendChild(img);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }

  sendButton.addEventListener('click', sendMessage);

  userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });

 
  addMessage("Zatura IA: ¡Hola! Pregúntame sobre el Sol, planetas, galaxias y más.", 'bot-message');
});
