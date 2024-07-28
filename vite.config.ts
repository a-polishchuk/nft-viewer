import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    base: '/nft-viewer/',
    plugins: [react(), tsconfigPaths()],
    build: {
        outDir: 'build',
    },
    server: {
        open: true,
    },
});
