import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import {
  addContact,
  toggle,
  filterItems,
} from './redux/contacts/contactsActions';
import Form from './components/Form/Form';
import ContactList from './components/ContactList/ContactList';
import './App.css';
import {
  isLoadingSelector,
  itemsSelector,
  isNameSelector,
  filterSelector,
  errorSelector,
} from './redux/contacts/contactsSelector';
class App extends Component {
  state = {
    isLoade: false,
  };
  changeFilter = e => {
    this.props.filterItems(e.target.value);
  };

  render() {
    const { isLoade } = this.state;
    const {
      contacts,
      hasNameInContacts,
      toggle,
      search,
      error,
      loader,
    } = this.props;
    return (
      <div>
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
        {!loader && !error && (
          <>
            <CSSTransition
              classNames="phonebook"
              timeout={1500}
              in={isLoade}
              mountOnEnter
            >
              <div>
                <h1>Phonebook</h1>
              </div>
            </CSSTransition>
            <CSSTransition
              in={hasNameInContacts}
              classNames="alert"
              unmountOnExit
              timeout={2500}
              onEntered={() => toggle(false)}
            >
              <div className="alert-wrapper">
                <h1 className="alert-title">
                  This name is have already in contacts list
                </h1>
              </div>
            </CSSTransition>
            <Form />
            <CSSTransition
              in={contacts.length > 1}
              unmountOnExit
              classNames="search"
              timeout={250}
            >
              <label className="form-label">
                <p>Find contacts by name:</p>
                <input
                  type="text"
                  name="search"
                  value={search}
                  onChange={this.changeFilter}
                />
              </label>
            </CSSTransition>
          </>
        )}
        <ContactList />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    contacts: itemsSelector(state),
    hasNameInContacts: isNameSelector(state),
    search: filterSelector(state),
    loader: isLoadingSelector(state),
    error: errorSelector(state),
  };
};
const mapDispatchToProps = {
  addContact,
  toggle,
  filterItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
