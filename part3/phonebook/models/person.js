const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

  const numberValidation = [
    {
      // Length validator
      validator: (number) => {
        const numberOfHyphens = (number.match(/-/g) || []).length;
        if (number.length - numberOfHyphens >= 8) {
          return true;
        }
        return false;
      },
      message: 'number must contain at least 8 digits',
    },
    {
      // Regex validator
      validator: number => {
        const isValidNumberWithHyphen = /^\d{2,3}-\d+$/.test(number)
        const isValidNumberNoHyphen = /^\d{8,}/.test(number)
          return isValidNumberWithHyphen || isValidNumberNoHyphen
      },
      message: 'invalid phone number'
    }
  ];

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: numberValidation,
    required: true
  },
});


personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
