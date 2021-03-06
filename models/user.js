const config = require('config');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

userSchema.methods.generateAuthToken = function() {
	// const paylod = { id: this._id, name: this.name }; the token will have id and name
	const paylod = { id: this._id };
	const token = jwt.sign(paylod, config.get('jwtPrivateKey'));
	return token;
};

const User = mongoose.model('Users', userSchema);

function validateUser(user) {
	const schema = {
		name: Joi.string().min(5).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required()
	};

	return Joi.validate(user, schema);
}

function validateAuth(user) {
	const schema = {
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required()
	};

	return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
exports.validateAuth = validateAuth;
