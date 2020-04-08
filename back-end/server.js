
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/bag', {
  useNewUrlParser: true
});

const multer = require('multer')
const upload = multer({
  dest: '/var/www/cp4.csmcclain.com/files',
  limits: {
    fileSize: 10000000
  }
});

const itemSchema = new mongoose.Schema({
  title: String,
  path: String,
});

const Item = mongoose.model('Item', itemSchema);

app.post('/api/documents', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/files/" + req.file.filename
  });
});

app.post('/api/items', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    path: req.body.path,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error)
  {
    console.log(error);
    res.sendStatus(404)
  }
});

app.put('/api/items/:id', async (req, res) =>
{
  try
  {
    let item = await Item.findOne({
      _id: req.params.id
    })
    item.title = req.body.title;
    item.description = req.body.description;
    await item.save();
    res.send(item);
  } catch (error)
  {
    Console.log(error);
    res.sendStatus(500);
  }
});




app.listen(3001, () => console.log('Server listening on port 3001!'));
