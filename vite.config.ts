import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

const getBasePath = () => {
  // 1. Explicit override from environment (e.g. GitHub Actions configure-pages output)
  if (process.env.BASE_PATH !== undefined && process.env.BASE_PATH !== '') {
    const p = process.env.BASE_PATH;
    return p.endsWith('/') ? p : `${p}/`;
  }
  // 2. Automatic repository detection in GitHub Actions
  if (process.env.GITHUB_REPOSITORY) {
    const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
    if (repo && repo.toLowerCase() === `${owner.toLowerCase()}.github.io`) {
      return '/';
    }
    return `/${repo}/`;
  }
  // 3. Fallback for local preview & development
  return './';
};

export default defineConfig(() => {
  return {
    base: getBasePath(),
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      allowedHosts: true as const,
      cors: true,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
