export function getChatPage() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chat Page</title>
  <script src="/static/js/chat.js" defer></script>
  <script src="/socket.io/socket.io.js"></script>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', sans-serif;
    }

    body {
      background-color: #121212;
      color: #e0e0e0;
      display: flex;
      flex-direction: column;
      height: 100vh;
      justify-content: center;
      align-items: center;
    }

    #chat-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 600px;
      height: 90vh;
      border: 1px solid #333;
      border-radius: 10px;
      overflow: hidden;
      background-color: #1e1e1e;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
    }

    #messages {
      flex: 1;
      list-style: none;
      padding: 20px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    #messages li {
      background: #2a2a2a;
      padding: 10px 15px;
      border-radius: 6px;
      max-width: 80%;
      word-wrap: break-word;
      animation: fadeIn 0.3s ease-in-out;
    }

    .typing-indicator {
      font-style: italic;
      color: #999;
      background: transparent;
      padding: 5px;
      animation: fadeIn 0.3s ease-in-out;
    }

    .dot-animate::after {
      content: '';
      display: inline-block;
      animation: dots 1.5s steps(3, end) infinite;
    }

    @keyframes dots {
      0% { content: ''; }
      33% { content: '.'; }
      66% { content: '..'; }
      100% { content: '...'; }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    #chat-form {
      display: flex;
      padding: 15px;
      background: #1c1c1c;
      border-top: 1px solid #333;
    }

    #chat-input {
      flex: 1;
      padding: 10px 15px;
      border: none;
      border-radius: 20px;
      background: #2a2a2a;
      color: #fff;
      outline: none;
    }

    #chat-form button {
      margin-left: 10px;
      padding: 10px 20px;
      background: #3a3a3a;
      color: #fff;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    #chat-form button:hover {
      background: #505050;
    }
  </style>
</head>
<body>
  <div id="chat-container">
    <ul id="messages"></ul>
    <form id="chat-form">
      <input id="chat-input" autocomplete="off" placeholder="Type a message..." />
      <button type="submit">Send</button>
    </form>
  </div>

  <script>
    const socket = io();
    const form = document.getElementById('chat-form');
    const input = document.getElementById('chat-input');
    const messages = document.getElementById('messages');

    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
        removeTypingIndicator();
      }
    });

    let typing = false;
    let timeout;

    input.addEventListener('input', () => {
      if (!typing) {
        typing = true;
        socket.emit('typing');
        timeout = setTimeout(stopTyping, 1000);
      } else {
        clearTimeout(timeout);
        timeout = setTimeout(stopTyping, 1000);
      }
    });

    function stopTyping() {
      typing = false;
      socket.emit('stop typing');
    }

    function addTypingIndicator() {
      if (!document.getElementById('typing-msg')) {
        const li = document.createElement('li');
        li.id = 'typing-msg';
        li.className = 'typing-indicator dot-animate';
        li.textContent = 'Someone is typing';
        messages.appendChild(li);
        messages.scrollTop = messages.scrollHeight;
      }
    }

    function removeTypingIndicator() {
      const typingMsg = document.getElementById('typing-msg');
      if (typingMsg) typingMsg.remove();
    }

    socket.on('typing', () => {
      addTypingIndicator();
    });

    socket.on('stop typing', () => {
      removeTypingIndicator();
    });

    socket.on('chat message', (msg) => {
      removeTypingIndicator();
      const item = document.createElement('li');
      item.textContent = msg;
      messages.appendChild(item);
      messages.scrollTop = messages.scrollHeight;
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });
  </script>
</body>
</html>
`;
}
