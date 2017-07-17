import React from 'react';
import ListContacts from './ListContacts.js';
import * as ContactsAPI from './utils/ContactsAPI.js';
import CreateContact from './CreateContact.js'

class App extends React.Component{

  pageState = {
    list:'list',
    create:'create'
  }

  state = {
    contacts : [],
    page:this.pageState.list
  }
 

  componentDidMount(){
    ContactsAPI.getAll().then( contacts=>{
      this.setState( {contacts} );
    } );
  }

  removeContact = contact =>{
    this.setState( prvState => ({
        contacts : prvState.contacts.filter( (c) => c !== contact )
      })
    );
    ContactsAPI.remove(contact);
  };

  render(){
    return (
      <div>
        { this.state.page === this.pageState.list &&(
            <ListContacts 
              onDeleteContact={ this.removeContact }
              contacts={this.state.contacts}/>
        )}
        { this.state.page === this.pageState.create && (
          <CreateContact/>
        )}
      </div>
    );
  }
}

export default App;