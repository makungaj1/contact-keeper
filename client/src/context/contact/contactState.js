import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER
} from '../types';

const ContactSate = (props) => {
	const initialState = {
		contacts: [
			{
				type: 'professional',
				id: '5d9bced76f5cdf330416efe6',
				name: 'Michee Boele',
				email: 'mboele@gmail.com',
				phone: '444-444-4444',
				user: '5d9bb482928fd820fcacffa6',
				date: '2019-10-07T23:48:39.479Z',
				__v: 0
			},
			{
				type: 'personal',
				id: '5d9bce687f9f091a5847de1a',
				name: 'Jonathan Makunga',
				email: 'jmakunga@gmail.com',
				phone: '444-444-4444',
				user: '5d9bb482928fd820fcacffa6',
				date: '2019-10-07T23:46:48.774Z',
				__v: 0
			},
			{
				type: 'personal',
				id: '5d9bce217f9f091a5847de19',
				name: 'Ted Johnson',
				email: 'ted@gmail.com',
				phone: '444-444-4444',
				user: '5d9bb482928fd820fcacffa6',
				date: '2019-10-07T23:45:37.353Z',
				__v: 0
			},
			{
				type: 'personal',
				id: '5d9bcd797f9f091a5847de18',
				name: 'Sara Smith',
				email: 'ssmith@gmail.com',
				phone: '444-444-4444',
				user: '5d9bb482928fd820fcacffa6',
				date: '2019-10-07T23:42:49.242Z',
				__v: 0
			}
		]
	};

	const [ state, dispatch ] = useReducer(ContactReducer, initialState);

	// ADD CONTACT
	const addContact = (contact) => {
		contact.id = uuid.v4();
		dispatch({ type: ADD_CONTACT, payload: contact });
	};
	// DELETE CONTACT
	const deleteContact = (id) => {
		dispatch({ type: DELETE_CONTACT, payload: id });
	};

	//SET CURRENT CONTACT

	// CLEAR CURRENT CONTACT

	// UPDATE CONTACT

	//FILTER CONTACT

	// CLEAR FILTER

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				addContact,
				deleteContact
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactSate;
