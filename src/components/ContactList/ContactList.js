import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  getContactsOperation,
  deleteContactOperation,
} from '../../redux/contacts/contactsOperations';
import {
  FilteredItemsSelector,
  isLoadingSelector,
} from '../../redux/contacts/contactsSelector';
import './ContactList.css';
const ContactList = ({ contacts, deleteContact, getContacts, loader }) => {
  useEffect(() => {
    console.log('123123');

    getContacts();
  }, []);
  return (
    <>
      {loader && (
        <Loader
          className="loader"
          type="ThreeDots"
          color="#ffc0cb"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      )}
      {!loader && (
        <TransitionGroup component="ul" className="list">
          {contacts.map(({ name, number, id }) => {
            return (
              <CSSTransition key={id} classNames="change" timeout={250}>
                <li className="item">
                  <p className="list-name"> {name} </p>
                  <p className="list-phone"> {number} </p>
                  <button
                    onClick={() => deleteContact(id)}
                    className="list-btn"
                  >
                    X
                  </button>
                </li>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    contacts: FilteredItemsSelector(state),
    loader: isLoadingSelector(state),
  };
};
const mapDispatchToProps = {
  deleteContact: deleteContactOperation,
  getContacts: getContactsOperation,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
