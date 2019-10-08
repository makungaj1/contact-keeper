const mongoose = require('mongoose');
const express = require('express');
const auth = require('./routes/auth');
const app = express();

mongoose
	.connect('mongodb://localhost/contact-keeper', {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then(() => console.log('Connected to MongoDB....'))
	.catch((err) => console.error('Could not connect to MongoDB...', err));

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.get('/', (req, res) => res.send('Hello world'));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
