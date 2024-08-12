// server.js
const jsonServer = require('json-server');
const path = require('path');

// Crie o servidor
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Configurações de middleware
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Middleware para simular login
server.post('/login', (req, res) => {
  // Simule uma autenticação básica
  const { email, password } = req.body;
  if (email === 'user1@user1.com' && password === '100@User1') {
    res.jsonp({ status: 'success', message: 'Login successful' });
  } else {
    res.status(401).jsonp({ status: 'error', message: 'Invalid credentials' });
  }
});

// Use o router com o arquivo db.json
server.use('/api', router);

// Inicie o servidor na porta 3001
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
