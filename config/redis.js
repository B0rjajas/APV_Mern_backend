// config/redis.js

const redis = require('redis');

// Crear una instancia del cliente Redis
const redisClient = redis.createClient();

// Manejar eventos de error
redisClient.on('error', (error) => {
  console.error('Error de Redis:', error);
});

module.exports = redisClient;