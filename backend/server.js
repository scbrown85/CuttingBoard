 
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Welcome to CuttingBoard.ai backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cuttingboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));
