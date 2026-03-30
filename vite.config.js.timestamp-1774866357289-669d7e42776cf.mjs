// vite.config.js
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import vue from "file:///home/project/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import DefineOptions from "file:///home/project/node_modules/unplugin-vue-define-options/dist/vite.js";
import { fileURLToPath, URL } from "node:url";
var __vite_injected_original_import_meta_url = "file:///home/project/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("ion-")
        }
      }
    }),
    DefineOptions()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
      "@components": fileURLToPath(new URL("./src/components", __vite_injected_original_import_meta_url)),
      "@views": fileURLToPath(new URL("./src/views", __vite_injected_original_import_meta_url)),
      "@stores": fileURLToPath(new URL("./src/stores", __vite_injected_original_import_meta_url)),
      "@utils": fileURLToPath(new URL("./src/utils", __vite_injected_original_import_meta_url)),
      "@assets": fileURLToPath(new URL("./src/assets", __vite_injected_original_import_meta_url)),
      "@composables": fileURLToPath(new URL("./src/composables", __vite_injected_original_import_meta_url)),
      "@plugins": fileURLToPath(new URL("./src/plugins", __vite_injected_original_import_meta_url)),
      "@config": fileURLToPath(new URL("./src/config", __vite_injected_original_import_meta_url)),
      "@api": fileURLToPath(new URL("./src/api", __vite_injected_original_import_meta_url)),
      "@core": fileURLToPath(new URL("./src/@core", __vite_injected_original_import_meta_url)),
      "@layouts": fileURLToPath(new URL("./src/@layouts", __vite_injected_original_import_meta_url))
    }
  },
  server: {
    port: 5173,
    host: true,
    strictPort: false,
    proxy: {
      "/api": {
        // Use VITE_API_URL from .env files for dev server proxy
        // Falls back to localhost:6668 if not set
        target: process.env.VITE_API_URL || "http://localhost:6668",
        changeOrigin: true,
        rewrite: (path) => path,
        configure: (proxy, options) => {
          proxy.on("proxyRes", (proxyRes, req, res) => {
            proxyRes.headers["Access-Control-Allow-Origin"] = "*";
            proxyRes.headers["Access-Control-Allow-Credentials"] = "true";
            proxyRes.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, PATCH";
            proxyRes.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With";
          });
        }
      }
    }
  },
  build: {
    target: "esnext",
    minify: "terser",
    sourcemap: false,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          "vuetify": ["vuetify"],
          "vue-core": ["vue", "vue-router", "pinia"],
          "i18n": ["vue-i18n"],
          "charts": ["apexcharts", "chart.js", "vue-chartjs", "vue3-apexcharts"],
          "utilities": ["axios", "jwt-decode", "xlsx", "quill"],
          "ui-libs": ["@fortawesome/vue-fontawesome", "@vueuse/core", "@vuelidate/core"],
          "casl": ["@casl/ability", "@casl/vue"]
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      "vue",
      "vue-router",
      "pinia",
      "axios",
      "vuetify",
      "@vueuse/core",
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/vue-fontawesome"
    ],
    exclude: ["@vite/preload-helper"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgRGVmaW5lT3B0aW9ucyBmcm9tICd1bnBsdWdpbi12dWUtZGVmaW5lLW9wdGlvbnMvdml0ZSdcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKHtcbiAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgIGNvbXBpbGVyT3B0aW9uczoge1xuICAgICAgICAgIGlzQ3VzdG9tRWxlbWVudDogKHRhZykgPT4gdGFnLnN0YXJ0c1dpdGgoJ2lvbi0nKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSksXG4gICAgRGVmaW5lT3B0aW9ucygpXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICAnQGNvbXBvbmVudHMnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL2NvbXBvbmVudHMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgICdAdmlld3MnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL3ZpZXdzJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICAnQHN0b3Jlcyc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvc3RvcmVzJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICAnQHV0aWxzJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy91dGlscycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgJ0Bhc3NldHMnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL2Fzc2V0cycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgJ0Bjb21wb3NhYmxlcyc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvY29tcG9zYWJsZXMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgICdAcGx1Z2lucyc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvcGx1Z2lucycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgJ0Bjb25maWcnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL2NvbmZpZycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgJ0BhcGknOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL2FwaScsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgJ0Bjb3JlJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy9AY29yZScsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgJ0BsYXlvdXRzJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy9AbGF5b3V0cycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgfVxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiA1MTczLFxuICAgIGhvc3Q6IHRydWUsXG4gICAgc3RyaWN0UG9ydDogZmFsc2UsXG4gICAgcHJveHk6IHtcbiAgICAgICcvYXBpJzoge1xuICAgICAgICAvLyBVc2UgVklURV9BUElfVVJMIGZyb20gLmVudiBmaWxlcyBmb3IgZGV2IHNlcnZlciBwcm94eVxuICAgICAgICAvLyBGYWxscyBiYWNrIHRvIGxvY2FsaG9zdDo2NjY4IGlmIG5vdCBzZXRcbiAgICAgICAgdGFyZ2V0OiBwcm9jZXNzLmVudi5WSVRFX0FQSV9VUkwgfHwgJ2h0dHA6Ly9sb2NhbGhvc3Q6NjY2OCcsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgsXG4gICAgICAgIGNvbmZpZ3VyZTogKHByb3h5LCBvcHRpb25zKSA9PiB7XG4gICAgICAgICAgcHJveHkub24oJ3Byb3h5UmVzJywgKHByb3h5UmVzLCByZXEsIHJlcykgPT4ge1xuICAgICAgICAgICAgcHJveHlSZXMuaGVhZGVyc1snQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJ10gPSAnKidcbiAgICAgICAgICAgIHByb3h5UmVzLmhlYWRlcnNbJ0FjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzJ10gPSAndHJ1ZSdcbiAgICAgICAgICAgIHByb3h5UmVzLmhlYWRlcnNbJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnXSA9ICdHRVQsIFBPU1QsIFBVVCwgREVMRVRFLCBPUFRJT05TLCBQQVRDSCdcbiAgICAgICAgICAgIHByb3h5UmVzLmhlYWRlcnNbJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnXSA9ICdDb250ZW50LVR5cGUsIEF1dGhvcml6YXRpb24sIFgtUmVxdWVzdGVkLVdpdGgnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICB0YXJnZXQ6ICdlc25leHQnLFxuICAgIG1pbmlmeTogJ3RlcnNlcicsXG4gICAgc291cmNlbWFwOiBmYWxzZSxcbiAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogZmFsc2UsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgICd2dWV0aWZ5JzogWyd2dWV0aWZ5J10sXG4gICAgICAgICAgJ3Z1ZS1jb3JlJzogWyd2dWUnLCAndnVlLXJvdXRlcicsICdwaW5pYSddLFxuICAgICAgICAgICdpMThuJzogWyd2dWUtaTE4biddLFxuICAgICAgICAgICdjaGFydHMnOiBbJ2FwZXhjaGFydHMnLCAnY2hhcnQuanMnLCAndnVlLWNoYXJ0anMnLCAndnVlMy1hcGV4Y2hhcnRzJ10sXG4gICAgICAgICAgJ3V0aWxpdGllcyc6IFsnYXhpb3MnLCAnand0LWRlY29kZScsICd4bHN4JywgJ3F1aWxsJ10sXG4gICAgICAgICAgJ3VpLWxpYnMnOiBbJ0Bmb3J0YXdlc29tZS92dWUtZm9udGF3ZXNvbWUnLCAnQHZ1ZXVzZS9jb3JlJywgJ0B2dWVsaWRhdGUvY29yZSddLFxuICAgICAgICAgICdjYXNsJzogWydAY2FzbC9hYmlsaXR5JywgJ0BjYXNsL3Z1ZSddXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGluY2x1ZGU6IFtcbiAgICAgICd2dWUnLFxuICAgICAgJ3Z1ZS1yb3V0ZXInLFxuICAgICAgJ3BpbmlhJyxcbiAgICAgICdheGlvcycsXG4gICAgICAndnVldGlmeScsXG4gICAgICAnQHZ1ZXVzZS9jb3JlJyxcbiAgICAgICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUnLFxuICAgICAgJ0Bmb3J0YXdlc29tZS92dWUtZm9udGF3ZXNvbWUnXG4gICAgXSxcbiAgICBleGNsdWRlOiBbJ0B2aXRlL3ByZWxvYWQtaGVscGVyJ11cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeU4sU0FBUyxvQkFBb0I7QUFDdFAsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sbUJBQW1CO0FBQzFCLFNBQVMsZUFBZSxXQUFXO0FBSCtGLElBQU0sMkNBQTJDO0FBS25MLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxNQUNGLFVBQVU7QUFBQSxRQUNSLGlCQUFpQjtB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
