export function getChatPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Simple Chat</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-white h-screen flex items-center justify-center">

  <div class="flex flex-col w-full max-w-md h-[90vh] border border-gray-700 rounded-lg overflow-hidden shadow-lg">
    
    <!-- Header -->
    <div class="bg-gray-800 p-4 text-center text-lg font-semibold border-b border-gray-700">
      💬 Chat Interface
    </div>

    <!-- Chat Messages -->
    <div id="chat" class="flex-1 p-4 space-y-2 overflow-y-auto bg-gray-900">
      <div class="self-start bg-gray-700 px-4 py-2 rounded-lg max-w-xs">Hello! How can I help you?</div>
      <div class="self-end bg-blue-600 px-4 py-2 rounded-lg max-w-xs ml-auto">I have a question...</div>
    </div>

    <!-- Message Input -->
    <form class="flex items-center border-t border-gray-700 p-3 bg-gray-800" onsubmit="sendMessage(event)">
      <input id="msgInput" type="text" placeholder="Type your message..." 
        class="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none" />
      <button type="submit" class="ml-2 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500">
        Send
      </button>
    </form>
  </div>

  <script>
    function sendMessage(e) {
      e.preventDefault();
      const input = document.getElementById('msgInput');
      const chat = document.getElementById('chat');
      if (input.value.trim()) {
        const msg = document.createElement('div');
        msg.className = 'self-end bg-blue-600 px-4 py-2 rounded-lg max-w-xs ml-auto';
        msg.textContent = input.value;
        chat.appendChild(msg);
        chat.scrollTop = chat.scrollHeight;
        input.value = '';
      }
    }
  </script>
</body>
</html>
`;
}
