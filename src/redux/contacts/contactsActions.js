import {
  ADD,
  REMOVE,
  FILTER,
  TOGGLE,
  LOADER,
  ERROR,
  GET_CONTACTS,
} from './contactsConstants';
import { createAction } from '@reduxjs/toolkit';

export const addContact = createAction(ADD);

export const removeItem = createAction(REMOVE);

export const filterItems = createAction(FILTER);

export const toggle = createAction(TOGGLE);
export const toggleLoader = createAction(LOADER);
export const setError = createAction(ERROR);
export const getContacts = createAction(GET_CONTACTS);
