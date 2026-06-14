const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const apiRouter = require('./api');
const authRouter = require('./auth');

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.json({ message: 'API do TrabalhoPA rodando com sucesso!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
