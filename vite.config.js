import glsl from "vite-plugin-glsl";
import restart from "vite-plugin-restart";

export default {
  root: "src/", // Sources files (typically where index.html is)
  publicDir: "../static/", // Path from "root" to static assets (files that are served as they are)
  server: {
    host: true, // Open to local network and display URL
    open: !("SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env), // Open if it's not a CodeSandbox
  },
  build: {
    outDir: "../dist", // Output in the dist/ folder
    emptyOutDir: true, // Empty the folder first
    sourcemap: true, // Add sourcemap
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }

          if (
            id.includes("/three/examples/") ||
            id.includes("/three/addons/")
          ) {
            return "three-examples-vendor";
          }

          if (id.includes("/three/")) {
            return "three-vendor";
          }

          if (id.includes("gsap")) {
            return "motion-vendor";
          }

          if (id.includes("cannon")) {
            return "physics-vendor";
          }

          if (id.includes("howler")) {
            return "audio-vendor";
          }

          if (id.includes("dat.gui")) {
            return "debug-vendor";
          }

          return "vendor";
        },
      },
    },
  },
  plugins: [
    glsl(), // Support GLSL files
    restart({ restart: ["../static/**"] }), // Restart server on static file change
  ],
};
