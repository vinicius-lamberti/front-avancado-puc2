import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'], // Mostra no terminal e gera arquivos HTML visuais
      exclude: ['node_modules/', 'src/setupTests.ts', 'src/types.ts'],
    },
  },
});