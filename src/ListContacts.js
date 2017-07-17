import React,{Component} from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class ListContacts extends Component{
  static propType = {
    contacts : PropTypes.array.isRequired,
    onDeleteContact : PropTypes.func.isRequired
  }

  state = {
    query:''
  }

  updateQuery = value =>{
    this.setState( {
      query:value
    } )
  }

  clearQuery = state =>{
    this.setState({
      query:''
    });
  }

  render(){
    const { contacts, onDeleteContact } = this.props;
    const { query } = this.state;

    let showingContacts;

    if(query){
      const match = new RegExp( escapeRegExp(query) ,'i');
      showingContacts = contacts.filter(
        contact=>match.test(contact.name)
      );
    }else{
      showingContacts = contacts;
    }

    showingContacts.sort(sortBy('name'));

    return (
      <div>
        <div className='lsit-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Search'
            value={query}
            onChange={ event=> this.updateQuery(event.target.value) }
          />
        </div>
        { showingContacts.length !== contacts.length && (
          <div style={{display:'inline-box',textAlign:'center',width:'100%'}}>
            <span>{`Now showing ${showingContacts.lenght} of ${contacts.length} total `}</span>
            <a onClick={ this.clearQuery }>Show all</a>
          </div>
        )}

        <ol className="contact-list">
          {
            showingContacts.map( contact => (
                <li key={contact.id} className='contact-list-item'>
                  <div className='contact-avatar' style={{
                    backgroundImage: `url(${contact.avatarURL})`
                  }}></div>
                  <div className='contact-details'>
                    <p>{contact.name}</p>
                    <p>{contact.email}</p>
                  </div>
                  <button 
                    onClick={ ()=>onDeleteContact(contact) }
                    className='contact-remove'>Remove</button>
                </li>
              )
            )
          }
        </ol>
      </div>
    );
  }
}

// function ListContacts(props){
//     return (
//       <ol className="contact-list">
//         {
//           props.contacts.map(
//             contact => (
//               <li key={contact.id} className='contact-list-item'>
//                 <div className='contact-avatar' style={{
//                   backgroundImage: `url(${contact.avatarURL})`
//                 }}></div>
//                 <div className='contact-details'>
//                   <p>{contact.name}</p>
//                   <p>{contact.email}</p>
//                 </div>
//                 <button 
//                   onClick = { ()=>{props.onDeleteContact(contact)} }
//                   className = 'contact-remove'>Remove</button>
//               </li>
//             )
//           )
//         }  
//       </ol>
//     );
// }

export default ListContacts;