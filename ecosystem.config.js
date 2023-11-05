module.exports = {
  apps : [
    {
      name   : "api",
      script : "dist/apps/api/main.js",
      instances: 2,
      exec_mode: "cluster_mode",
      env: {
          PORT: 8080,
      },
    },
    {
      name   : "frontend",
      script: "serve",
      env: {
        PM2_SERVE_PATH: 'dist/apps/dshit-count',
        PM2_SERVE_PORT: 4200,
        PM2_SERVE_SPA: 'true',
        PM2_SERVE_HOMEPAGE: '/index.html'
      }
    },
  ]
}
