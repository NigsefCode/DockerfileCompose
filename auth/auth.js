const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const secretKey = 'tu_clave_secreta'; // En producción, usa una clave segura y guárdala en variables de entorno

app.post('/login', (req, res) => {
  // Aquí se debe verificar las credenciales del usuario contra una base de datos
  // Este es solo un ejemplo
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

app.listen(8001, () => {
  console.log('Servicio de autenticación escuchando en el puerto 8001');
});
