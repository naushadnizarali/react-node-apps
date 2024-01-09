import cors from 'cors';
import express from 'express';
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const app = express();

var corsOptions = {
  origin: 'http://localhost:4201',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require('./app/models').default;

db.mongoose
  .connect(db.url)
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

// simple route
app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

require('./app/routes/turorial.routes').default(app);

// set port, listen for requests
app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
