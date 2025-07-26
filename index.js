const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 🔓 Permitir CORS desde cualquier origen (puedes restringirlo si quieres)
app.use(cors({
  origin: true,
  credentials: true,
}));

// 🔁 Proxy para Directus Cloud
app.use('/api', createProxyMiddleware({
  target: 'https://cms-sahara.directus.app/', // <--- reemplaza con tu URL de Directus
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
}));

const PORT = process.env.PORT || 8055;
app.listen(PORT, () => {
  console.log(`Proxy escuchando en http://localhost:${PORT}`);
});