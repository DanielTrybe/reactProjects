const express = require('express');

const router = express.Router();
const crypto = require('crypto');

const token = crypto.randomBytes(8).toString('hex');

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
// HEX HEXADECIMAL

router.post('/', (req, res) => {
  const { email, password } = req.body;
  const tok = { token };
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!email.match(/\S+@\S+\.com/)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).json(tok);
});

module.exports = router;