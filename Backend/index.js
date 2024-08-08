const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

const login = require('./controller/logincontrol');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://ManasDeveloper:manas14@cluster0.lck1f65.mongodb.net/Hr-Portal')
  .then(() => console.log("Database connected"))
  .catch(err => console.log("Failed to connect to the database", err));

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/login', login);

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
