const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const auth = require('../midleware/auth');
const router = express.Router();
const _ = require('lodash');
const { User, validateAuth } = require('../models/user');

// @route GET api.auth
// @desc Get logged in user
// @access Private

router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (ex) {
		console.error(ex.message);
		res.status(500).send('Server Error');
	}
});

// @route POST api/auth
// @desc Auth user & get token
// @access Public

router.post('/', async (req, res) => {
	// Check for error
	const { error } = validateAuth(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const { email, password } = _.pick(req.body, [ 'email', 'password' ]);

	try {
		// find user by email
		let user = await User.findOne({ email: email });
		if (!user) return res.status(400).json({ msg: 'Invalid Credential' });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ msg: 'Invalid Credential' });

		const token = user.generateAuthToken();
		res.header('x-auth-token', token).send({ msg: 'Logged in' });
	} catch (ex) {
		console.error(ex.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
