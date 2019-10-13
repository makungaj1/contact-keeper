import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
	CONTACT_ERROR,
	GET_CONTACT,
	CLEAR_CONTACT
} from '../types';

const ContactSate = (props) => {
	const initialState = {
		contacts: null,
		current: null,
		filtered: null,
		error: null
	};

	const [ state, dispatch ] = useReducer(ContactReducer, initialState);
	// GET CONTACT
	const getContacts = async (t) => {
		try {
			const res = await axios.get('/api/contacts');
			dispatch({ type: GET_CONTACT, payload: res.data });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};

	// ADD CONTACT
	const addContact = async (contact) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const res = await axios.post('/api/contacts', contact, config);
			dispatch({ type: ADD_CONTACT, payload: res.data });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};
	// DELETE CONTACT
	const deleteContact = async (_id) => {
		try {
			axios.delete(`/api/contacts/${_id}`);
			dispatch({ type: DELETE_CONTACT, payload: _id });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};

	// CLEAR CONTACTS
	const clearContacts = () => {
		dispatch({ type: CLEAR_CONTACT });
	};

	//SET CURRENT CONTACT
	const setCurrent = (contact) => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};

	// CLEAR CURRENT CONTACT
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	// UPDATE CONTACT
	const updateContact = async (contact) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
			dispatch({ type: UPDATE_CONTACT, payload: res.data });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};

	// FILTER CONTACT

	const filteredContacts = (text) => {
		dispatch({ type: FILTER_CONTACTS, payload: text });
	};

	// CLEAR FILTER
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				current: state.current,
				updateContact,
				filteredContacts,
				clearFilter,
				filtered: state.filtered,
				error: state.error,
				getContacts,
				clearContacts
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactSate;
