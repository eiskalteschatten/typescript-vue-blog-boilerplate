import { renderToString } from 'vue/server-renderer';
import { createApp } from '@tvbb/frontend';

export async function renderFrontend(): Promise<string> {
  const app = createApp();
  const html = await renderToString(app);

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Blog</title>
        <script type="module" src="/assets/client.js"></script>
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
    </html>
  `;
}

export default renderFrontend;
