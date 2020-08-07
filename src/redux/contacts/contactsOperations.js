import axios from 'axios';
import {
  addContact,
  removeItem,
  toggleLoader,
  setError,
  getContacts,
} from './contactsActions';

const url = 'http://localhost:9999/contacts';
export const addContactOperation = item => async dispatch => {
  try {
    dispatch(toggleLoader(true));
    const res = await axios.post(url, item);
    console.log(res);

    dispatch(addContact(res.data));
  } catch (error) {
    setError(error);
  } finally {
    dispatch(toggleLoader(false));
  }
};
export const deleteContactOperation = idContact => async dispatch => {
  try {
    dispatch(toggleLoader(true));
    const res = await axios.delete(`${url}/${idContact}`);
    dispatch(removeItem(idContact));
  } catch (error) {
    setError(error);
  } finally {
    dispatch(toggleLoader(false));
  }
};
export const getContactsOperation = () => async dispatch => {
  try {
    dispatch(toggleLoader(true));
    const res = await axios.get(url);
    console.log(res.data);
    dispatch(getContacts(res.data));
  } catch (error) {
    setError(error);
  } finally {
    dispatch(toggleLoader(false));
  }
};
