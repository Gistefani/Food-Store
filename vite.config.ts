import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        //d:aplicaion/dist/
        index: resolve(__dirname, "src/pages/store/home/home.html"),
        login: resolve(__dirname, "src/pages/store/cart/cart.html"),
        
       
      },
    },
  },
  base: "./",
});
