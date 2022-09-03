import { Component } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

import { AppContainer, PageTitle, Title } from './App.styled';

import { filterContacts } from 'helpers/filterContacts';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export class App extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

componentDidUpdate(prevProps, prevState){
  localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
  if(this.state.contacts.length !== prevState.contacts.length){
    this.setState( { contacts : JSON.parse(localStorage.getItem('contacts'))}) 
  }
}

componentDidMount(){
  if(localStorage.getItem('contacts')){
    this.setState( { contacts : JSON.parse(localStorage.getItem('contacts'))}) 
  }
}

  handleAddContact = contact => {
    if (this.state.contacts.some(cont => cont.name === contact.name)) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    this.setState(prev => ({
      contacts: [...prev.contacts, contact],
    }));
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  setFilterValue = ({ target: { value } }) => {
    this.setState({ filter: value });
  };

  render() {
    
    const filteredContacts = filterContacts(
      this.state.contacts,
      this.state.filter
    );
    return (
      <AppContainer>
        <PageTitle>Phonebook</PageTitle>
        <ContactForm onAddContact={this.handleAddContact} />
        <Title>Contacts</Title>
        <Filter handleSetFilterValue={this.setFilterValue} />
        <ContactList
          contacts={filteredContacts}
          handleDeleteContact={this.handleDeleteContact}
        />
      </AppContainer>
    );
  }
}
