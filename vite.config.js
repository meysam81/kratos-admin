import { defineConfig, loadEnv } from "vite";
import { resolve } from 'path';
import { ViteMinifyPlugin } from "vite-plugin-minify";

export default defineConfig(({ _, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
        },
        output: {
          manualChunks: undefined,
          entryFileNames: "[name].[hash].js",
          chunkFileNames: "[name].[hash].js",
          assetFileNames: "[name].[hash].[ext]",
        },
      },
      minify: true,
    },
    server: {
      port: env.PORT || 8080,
    },
    css: {
      postcss: "./postcss.config.js",
    },
    plugins: [ViteMinifyPlugin({})],
    resolve: {
      alias: {
        "@": resolve(__dirname),
      },
    },
  };
});
