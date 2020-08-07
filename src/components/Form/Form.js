import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addContact, toggle } from '../../redux/contacts/contactsActions';
import { addContactOperation } from '../../redux/contacts/contactsOperations';
import {
  itemsSelector,
  isNameSelector,
} from '../../redux/contacts/contactsSelector';
import './Form.css';
class Form extends Component {
  state = {
    name: '',
    number: '',
  };
  changeValue = ({ target }) => {
    const { value } = target;
    const { name } = target;
    this.setState({
      [name]: value,
    });
  };
  hasContact = name => {
    const { contacts } = this.props;
    return contacts.some(cont => cont.name === name);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;

    const item = {
      id: Date.now(),
      name,
      number,
    };
    const hasNameIn = this.hasContact(item.name);
    if (hasNameIn) {
      this.props.toggle(true);
      return;
    }
    this.props.addContact(item);
    this.props.toggle(false);
    this.setState({
      name: '',
      number: '',
    });
  };
  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <input
          className="form-item"
          type="text"
          value={name}
          name="name"
          placeholder="Your name"
          onChange={this.changeValue}
        />{' '}
        <input
          className="form-item"
          type="phone"
          placeholder="333-333-333"
          value={number}
          name="number"
          onChange={this.changeValue}
        />{' '}
        <button className="form-btn"> Add contact </button>{' '}
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    contacts: itemsSelector(state),
    hasNameInContacts: isNameSelector(state),
  };
};
const mapDispatchToProps = {
  addContact: addContactOperation,
  toggle,
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
