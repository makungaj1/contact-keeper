const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const _ = require('lodash');
const { User, validate } = require('../models/user');

// @Register a user

router.post('/', async (req, res) => {
	// Check for error
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Check if user already exist
	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('User already registered.');

	user = new User(_.pick(req.body, [ 'name', 'email', 'password' ]));

	// Hash password
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	//Save user to the database
	await user.save();

	const token = user.generateAuthToken();
	res.header('x-auth-token', token).send(_.pick(user, [ '_id', 'name', 'email' ]));
});

module.exports = router;
