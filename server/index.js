const express = require('express');
const bp = require('body-parser');
const ejs = require('ejs');
const db = require('../database/index');
const dataTransformer = require('./dataTransformer');

const port = 3005;

const app = express();

app.use(express.static('public'));
app.use(bp.json());
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

app.listen(port, () => { console.log(`Listening on port ${port}`); });

// app.post('calendar/:id/', (req, res) => {
//   db.insertOne(req.params.id, year, month, day, timeslot,
//     () => { res.sendStatus(400); },
//     (data) => { res.send(data); });
// });

// app.put('calendar/:id/', (req, res) => {
//   db.updateOne(req.params.id, year, month, day, timeslot,
//     () => { res.sendStatus(400); },
//     (data) => { res.send(data); });
// });

// app.delete('calendar/:id', (req, res) => {
//   db.deleteOne(req.params.id,
//     () => { res.sendStatus(400); },
//     (data) => { res.send(data); });
// });
