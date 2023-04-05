import { createSSRApp } from 'vue';
import path from 'path';

export function createApp() {
  return createSSRApp({
    data: () => ({ count: 1 }),
    template: `<button @click="count++">{{ count }}</button>`
  });
}

export const frontendRoot = path.resolve(__dirname, 'dist');
