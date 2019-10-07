const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const USERS = mongoose.model(
	'USERS',
	new mongoose.Schema({
		name: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 50
		}
	})
);

router.post('/', async (req, res) => {
	let user = new USERS({ name: req.body.name });
	user = await user.save();
	res.send(user);
});

module.exports = router;
