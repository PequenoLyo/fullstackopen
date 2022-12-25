const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://pequenoFSO:${password}@cluster0.k87pjcu.mongodb.net/?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  // Show all entries
  mongoose.connect(url);

  console.log('phonebook:');
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  // Add entry
  mongoose
    .connect(url)
    .then((result) => {
      console.log('connected');

      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      });

      return person.save();
    })
    .then(() => {
      console.log(
        `Added ${process.argv[3]} number ${process.argv[4]} to phonebook`
      );
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
}
