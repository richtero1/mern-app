const mongoose = require('mongoose');
const URI = 'mongodb://localhost/mern-db';

mongoose.connect(URI, { useNewUrlParser: true , useUnifiedTopology: true })
  .then(db => console.log('Db is connected'))
  .catch(error => console.error(error));

module.exports = mongoose;