export function getChatPage() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Chat Page</title>
  <!-- Scripts will be moved to the end of the body -->
  <style>
    /* ... Your CSS is perfect, no changes needed ... */
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; }
    body { background-color: #121212; color: #e0e0e0; display: flex; flex-direction: column; height: 100vh; justify-content: center; align-items: center; }
    #chat-container { display: flex; flex-direction: column; width: 100%; max-width: 600px; height: 90vh; border: 1px solid #333; border-radius: 10px; overflow: hidden; background-color: #1e1e1e; box-shadow: 0 0 20px rgba(0, 0, 0, 0.6); position: relative; }
    #messages { flex: 1; list-style: none; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; }
    #messages li { background: #2a2a2a; padding: 10px 15px; border-radius: 6px; max-width: 80%; word-wrap: break-word; animation: fadeIn 0.3s ease-in-out; }
    #messages li.own-message { background: #005c4b; align-self: flex-end; }
    #messages li img { max-width: 200px; border-radius: 4px; margin-top: 5px; display: block; }
    .typing-indicator { font-style: italic; color: #999; background: transparent; padding: 5px; animation: fadeIn 0.3s ease-in-out; }
    .dot-animate::after { content: ''; display: inline-block; animation: dots 1.5s steps(3, end) infinite; }
    @keyframes dots { 0% { content: ''; } 33% { content: '.'; } 66% { content: '..'; } 100% { content: '...'; } }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    #chat-form { display: flex; padding: 15px; background: #1c1c1c; border-top: 1px solid #333; align-items: center; gap: 10px; }
    #chat-input { flex: 1; padding: 10px 15px; border: none; border-radius: 20px; background: #2a2a2a; color: #fff; outline: none; }
    #chat-form button { padding: 10px; background: #3a3a3a; color: #fff; border: none; border-radius: 20px; cursor: pointer; transition: background 0.2s ease; }
    #chat-form button:hover { background: #505050; }
    #chat-form button:disabled { background: #2a2a2a; cursor: not-allowed; }
    #toast-container { position: absolute; top: 20px; right: 20px; z-index: 999; display: flex; flex-direction: column; gap: 10px; }
    .toast { padding: 10px 20px; background-color: #333; color: #fff; border-radius: 6px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); opacity: 0.9; animation: fadeIn 0.3s ease-in-out; }
    .toast.error { background-color: #d32f2f; }
  </style>
</head>
<body>
  <div id="chat-container">
    <div id="toast-container"></div>
    <ul id="messages"></ul>
    <form id="chat-form">
      <input type="file" id="file-input" style="display: none;" accept="image/*" />
      <button type="button" id="upload-btn">📎</button>
      <button type="button" id="emoji-btn">😊</button>
      <input id="chat-input" autocomplete="off" placeholder="Type a message..." />
      <button type="submit">Send</button>
    </form>
  </div>

  <!-- FIXED: All scripts are moved to the end of the body to prevent race conditions. -->
  <script src="/socket.io/socket.io.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@joeattardi/emoji-button@4.6.4/dist/index.umd.js"></script>

  <script>
    // FIXED: Removed the 'DOMContentLoaded' wrapper as it's no longer needed.
    // The IIFE (Immediately Invoked Function Expression) is still good practice.
    (() => {
      const chatSocket = io('/chat');
      const userSocket = io('/user');
      const form = document.getElementById('chat-form');
      const input = document.getElementById('chat-input');
      const messages = document.getElementById('messages');
      const toastContainer = document.getElementById('toast-container');
      const fileInput = document.getElementById('file-input');
      const uploadBtn = document.getElementById('upload-btn');
      const emojiBtn = document.getElementById('emoji-btn');

      // --- Emoji Picker Initialization ---
      // This will now work because the script above has already loaded and executed.
      try {
        const picker = new EmojiButton();
        picker.on('emoji', emoji => {
          input.value += emoji;
          input.focus();
        });
        emojiBtn.addEventListener('click', () => picker.togglePicker(emojiBtn));
      } catch (error) {
        console.error('Failed to initialize Emoji picker:', error);
        emojiBtn.disabled = true;
        emojiBtn.title = 'Emoji picker failed to load';
      }

      // --- Helper Functions and Event Listeners ---
      function appendMessage(data, isOwn = false) {
        removeTypingIndicator();
        const item = document.createElement('li');
        if (data.type === 'text') {
          item.textContent = data.content;
        } else if (data.type === 'file' && data.fileType.startsWith('image/')) {
          const img = document.createElement('img');
          img.src = data.fileData;
          img.alt = data.fileName;
          item.appendChild(img);
        }
        if (isOwn) {
          item.classList.add('own-message');
        }
        messages.appendChild(item);
        messages.scrollTop = messages.scrollHeight;
      }

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (input.value) {
          const messageData = { type: 'text', content: input.value };
          chatSocket.emit('chat message', messageData);
          appendMessage(messageData, true);
          input.value = '';
          chatSocket.emit('stop typing', 'User');
        }
      });

      chatSocket.on('chat message', (data) => appendMessage(data, false));
      chatSocket.on('chat file', (data) => appendMessage(data, false));

      uploadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        fileInput.click();
      });

      fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (!file) return;
        const MAX_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
          showToast('File is too large. Max size is 5MB.', 'error');
          fileInput.value = '';
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          const fileData = { type: 'file', fileName: file.name, fileData: reader.result, fileType: file.type };
          chatSocket.emit('chat file', fileData);
          appendMessage(fileData, true);
        };
        reader.onerror = () => showToast('Error reading file.', 'error');
        reader.readAsDataURL(file);
        fileInput.value = '';
      });

      let typing = false;
      let timeout;
      const stopTyping = () => {
        typing = false;
        chatSocket.emit('stop typing', 'User');
      };
      input.addEventListener('input', () => {
        if (!typing) {
          typing = true;
          chatSocket.emit('typing', 'User');
        }
        clearTimeout(timeout);
        timeout = setTimeout(stopTyping, 1500);
      });

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

      chatSocket.on('typing', ({ username }) => addTypingIndicator());
      chatSocket.on('stop typing', ({ username }) => removeTypingIndicator());

      function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = 'toast';
        if (type === 'error') {
          toast.classList.add('error');
        }
        toast.textContent = message;
        toastContainer.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
      }

      userSocket.on('connect', () => showToast('You have connected.'));
      userSocket.on('user event response', (data) => {
          const message = data.type === 'joined' ? 'Another user has joined.' : 'A user has left.';
          showToast(message);
      });

    })();
  </script>
</body>
</html>
`;
}
