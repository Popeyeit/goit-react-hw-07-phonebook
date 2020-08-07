import { configureStore } from '@reduxjs/toolkit';
import contactsReduser from './contacts/contactsReducers';

export default configureStore({
  reducer: {
    contacts: contactsReduser,
  },
});
