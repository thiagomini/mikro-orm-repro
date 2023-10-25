import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    root: './',
    environment: 'node',
    testTimeout: 360000,
    hookTimeout: 360000,
    threads: true,
  },
  plugins: [
    // This is required to build the test files with SWC
    swc.vite({
      jsc: {
        transform: {
          useDefineForClassFields: false
        }
      }
    }),
  ],
});
