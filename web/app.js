const express = require('express');
const { Pool } = require('pg');
const redis = require('redis');
const { promisify } = require('util');

const app = express();
const port = 8000;

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Configuración de la conexión a Redis
const redisClient = redis.createClient(process.env.REDIS_URL);
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

app.get('/', async (req, res) => {
  try {
    let visitas;
    
    // Intentar obtener datos de Redis
    const cachedVisits = await getAsync('visitas');
    
    if (cachedVisits !== null) {
      // Si existe en caché, incrementar
      visitas = parseInt(cachedVisits) + 1;
    } else {
      // Si no existe en caché, obtener de la base de datos
      const dbResult = await pool.query('SELECT visitas FROM estadisticas');
      visitas = dbResult.rows[0].visitas + 1;
    }
    
    // Actualizar tanto Redis como la base de datos
    await setAsync('visitas', visitas);
    await pool.query('UPDATE estadisticas SET visitas = $1', [visitas]);
    
    res.send(`Número de visitas: ${visitas} (actualizado en caché y BD)`);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.listen(port, () => {
  console.log(`Aplicación web escuchando en http://localhost:${port}`);
});
