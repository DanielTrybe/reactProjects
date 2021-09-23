const express = require('express');

const fs = require('fs').promises;
const { autoriza, data, idade, nome, talkExist } = require('../middleware/talkPost.js');

const router = express.Router();

const readFile = () => {
    const file = fs.readFile('./talker.json', 'utf8')
    .then((response) => JSON.parse(response));
    return file;
};

router.get('/', async (_req, res) => {
  const read = await readFile();
  if (!read) return res.status(200).json(Array.from([]));
  res.status(200).json(read);
});

router.get('/search',
  autoriza,
  async (req, res) => {
  const { q } = req.query;
  const readF = await readFile();
  const filter = readF.filter((item) => {
    const geral = item.name.toLowerCase();
    const stringValue = q.toLowerCase();
    return geral.includes(stringValue);
  });
  if (!q) return res.status(200).json(readF);
  res.status(200).json(filter);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const readF = await readFile();
  const filtered = readF.find((resp) => Number(resp.id) === Number(id));
  if (!filtered) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(filtered);
});

// adicionar pessoa abaixo

router.post('/',
  autoriza,
  nome,
  idade,
  talkExist,
  data,
  async (req, res) => {
    const file = await readFile();
    const id = file.length + 1;
    const { name, age, talk } = req.body;
    const result = {
      id,
      name,
      age,
      talk,
    };
    const newTalkers = JSON.stringify([...file, result]);
    await fs.writeFile('talker.json', newTalkers);
    res.status(201).json(result);
});

router.put('/:id',
  autoriza,
  nome,
  idade,
  talkExist,
  data,
  async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const readF = await readFile();
  const peopleIndex = readF.findIndex((item) => item.id === Number(id));
  readF[peopleIndex] = { ...readF[peopleIndex], name, age, talk };
  await fs.writeFile('talker.json', JSON.stringify(readF));
  res.status(200).json(readF[peopleIndex]);
});

router.delete('/:id', 
  autoriza,
  async (req, res) => {
  const { id } = req.params;
  const readF = await readFile();
  const peopleIndex = readF.findIndex((item) => item.id === Number(id));
  readF.splice(peopleIndex, 1);
  await fs.writeFile('talker.json', JSON.stringify(readF));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  });

module.exports = router;
