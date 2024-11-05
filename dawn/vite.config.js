export default {
  root: "src/",
  publicDir: "../static/",
  base: process.env.NODE_ENV === "production" ? "/threejs/dawn/" : "./",
  server: {
    host: true,
    open: !("SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env),
  },
  build: {
    outDir: "../build",
    emptyOutDir: true,
    sourcemap: true,
  },
};
