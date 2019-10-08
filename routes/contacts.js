const express = require('express');
const router = express.Router();
const auth = require('../midleware/auth');
const User = require('../models/user');
const Joi = require('joi');
const _ = require('lodash');
const Contact = require('../models/contact');

// @route Get api/contacts
// @desc Get all users contacts
// @access Private

router.get('/', auth, async (req, res) => {
	try {
		const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
		res.json(contacts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route POST api/contacts
// @desc Add anew contact
// @access Private

router.post('/', auth, async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let contact = _.pick(req.body, [ 'name', 'email', 'type', 'phone' ]);
	contact.user = req.user.id;

	try {
		contact = new Contact(contact);
		contact = await contact.save();

		res.json(contact);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route PUT api/contacts/:id
// @desc Update  contact
// @access Private

router.put('/:id', auth, async (req, res) => {
	const { name, email, phone, type } = req.body;

	// Build contact object
	const contactObject = {};
	if (name) contactObject.name = name;
	if (email) contactObject.email = email;
	if (phone) contactObject.phone = phone;
	if (type) contactObject.type = type;

	try {
		let contact = await Contact.findById(req.params.id);
		if (!contact) return res.status(400).json({ msg: 'Contact not found' });

		// const contactDoc = new ContactDoc(contact);
		// contactDoc = await contactDoc.save();

		// Make sure user owns contact
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not authorized' });
		}

		contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactObject }, { new: true });
		res.json(contact);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route DELETE api/contacts/:id
// @desc Delete  contact
// @access Private

router.delete('/:id', auth, async (req, res) => {
	try {
		let contact = await Contact.findById(req.params.id);
		if (!contact) return res.status(400).json({ msg: 'Contact not found' });

		// const contactDoc = new ContactDoc(contact);
		// contactDoc = await contactDoc.save();

		// Make sure user owns contact
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not authorized' });
		}

		await Contact.findByIdAndRemove(req.params.id);
		res.json({ msg: 'Contact removed' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

function validate(user) {
	const schema = {
		name: Joi.string().min(5).max(100).required(),
		phone: Joi.string().min(5).max(13),
		email: Joi.string(),
		type: Joi.string()
	};

	return Joi.validate(user, schema);
}

module.exports = router;
