const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://admin:password123@localhost:27017/cruddb?authSource=admin')
  .then(() => console.log('Mongo rodando'))
  .catch(e => console.error('Mongo:', e.message));

const Item = mongoose.model('Item', new mongoose.Schema({
  name: String,
  description: String
}));

app.get('/items', async (_, res) => res.json(await Item.find()));
app.post('/items', async (req, res) => res.json(await new Item(req.body).save()));
app.get('/items/:id', async (req, res) => res.json(await Item.findById(req.params.id)));
app.put('/items/:id', async (req, res) => res.json(await Item.findByIdAndUpdate(req.params.id, req.body)));
app.delete('/items/:id', async (req, res) => res.json(await Item.findByIdAndDelete(req.params.id)));

app.listen(3000, () => console.log('API 3000'));
