import { Injectable } from '@nestjs/common';

@Injectable()
export class IniAppService {
  getHello(): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome</title>
        <style>
          body {
            margin: 0;
            background: #0f0f0f;
            color: #00ffe7;
            font-family: 'Courier New', Courier, monospace;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            overflow: hidden;
          }

          h1 {
            font-size: 3em;
            text-shadow: 0 0 10px #00ffe7, 0 0 20px #00ffe7, 0 0 40px #00ffe7;
            letter-spacing: 0.1em;
            white-space: nowrap;
          }

          .cursor {
            display: inline-block;
            width: 10px;
            background-color: #00ffe7;
            animation: blink 1s infinite;
            height: 1em;
            margin-left: 5px;
          }

          @keyframes blink {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0; }
          }
        </style>
      </head>
      <body>
        <h1 id="text"></h1><div class="cursor"></div>

        <script>
          const target = document.getElementById('text');
          const message = "HELLO WORLD!";
          const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
          let iterations = 0;

          const scramble = (el, finalText, speed = 40) => {
            const interval = setInterval(() => {
              el.innerText = finalText
                .split("")
                .map((char, i) => {
                  if (i < iterations) return finalText[i];
                  return letters[Math.floor(Math.random() * letters.length)];
                })
                .join("");

              if (iterations >= finalText.length) clearInterval(interval);
              iterations += 1 / 3;
            }, speed);
          };

          scramble(target, message);
        </script>
      </body>
      </html>
    `;
  }
}
