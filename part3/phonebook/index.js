const express = require('express');
const app = express();
var morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const Person = require('./models/person');

app.use(express.json());
app.use(express.static('build'));
app.use(cors());

morgan.token('body', (request) => {
  return request.method === 'POST' ? JSON.stringify(request.body) : ' ';
});
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

// app.get('/', (request, response) => {
//   response.send('<h1>Hello world!</h1>');
// });

app.get('/info', (request, response) => {
  Person.find({}).then((persons) => {
    response.send(
      `<p>Phonebook has info for ${persons.length} people</p>
          <p>${Date()}</p>`
    );
  });
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;

  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((err) => console.log(err));
});

app.post('/api/persons', (request, response) => {
  console.log('POST');

   const { name, number } = request.body;
  console.log(request.body)

  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  })
  .catch((err) => console.log(err));
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
