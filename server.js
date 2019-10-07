const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose
	.connect('mongodb://localhost/users')
	.then(() => console.log('Connected to MongoDB....'))
	.catch((err) => console.error('Could not connect to MongoDB...'));

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.get('/', (req, res) => res.send('Hello world'));

app.use('/api/users', require('./routes/users'));
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/contacts', require('./routes/contacts'));
