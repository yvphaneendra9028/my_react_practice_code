import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";


export default defineConfig({

    plugins: [

        react(),

        visualizer({
            open: true
        })

    ],
    base: '/my_react_practice_code/'

});