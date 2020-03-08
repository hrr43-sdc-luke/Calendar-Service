const path = require('path');
const compression = require('compression');
const express = require('express');
const cors = require('cors');
const ejs = require('ejs');
const db = require('../database/index');
const dataTransformer = require('./dataTransformer');

const port = 3005;

const app = express();


app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(compression());
app.use('/', express.static(path.join(`${__dirname}/public/`)));

app.engine('html', ejs.renderFile);


app.get('/:id', (req, res) => {
  res.render('../public/index.html');
});

app.get('/calendar/:id/', (req, res) => {
  db.get(req.params.id,
    () => { res.sendStatus(400); },
    (data) => {
      const transformedData = dataTransformer(data);
      res.send([transformedData]);
    });
});

const log = (txt) => {
  // eslint-disable-next-line no-console
  console.log(new Date().toString(), txt);
};

app.listen(port, () => log(`
calendar service listening on port ${port}`));