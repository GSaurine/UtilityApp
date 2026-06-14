const express = require('express');
const router = express.Router();
const pool = require('./db');
const { v4: uuidv4 } = require('uuid');
const authenticateToken = require('./middleware/authMiddleware');

// Aplicar o middleware de autenticação para todas as rotas de atividades
router.use(authenticateToken);

// Listar atividades do usuário logado
router.get('/activities', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM activities WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Criar nova atividade para o usuário logado
router.post('/activities', async (req, res) => {
  const { activity } = req.body;
  if (!activity) {
    return res.status(400).json({ error: 'O campo activity é obrigatório.' });
  }

  const id = uuidv4();
  try {
    await pool.query('INSERT INTO activities (id, user_id, activity) VALUES (?, ?, ?)', [id, req.user.id, activity]);
    const [rows] = await pool.query('SELECT * FROM activities WHERE id = ?', [id]);
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Marcar como concluída/não concluída (apenas se pertencer ao usuário)
router.patch('/activities/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const [result] = await pool.query('UPDATE activities SET completed = ? WHERE id = ? AND user_id = ?', [completed, id, req.user.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Atividade não encontrada ou não pertence ao usuário.' });
    }
    res.json({ message: 'Atividade atualizada com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deletar atividade (apenas se pertencer ao usuário)
router.delete('/activities/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM activities WHERE id = ? AND user_id = ?', [id, req.user.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Atividade não encontrada ou não pertence ao usuário.' });
    }
    res.json({ message: 'Atividade deletada com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
