class ContactList extends React.Component {
  constructor(){
    super();
    this.updateRecip = this.updateRecip.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changeTab = this.changeTab.bind(this);
  }

  updateRecip(recipient) {
    this.props.updateTo(recipient)
  }

  changeTab() {
    if (this.props.tabs["All Contacts"]) {
        allContacts 
    } else if (this.props.tabs["Friendly"]) {

    } else if (this.props.tabs["Corp"]) {

    }
  }

  handleClick(e) {
    e.preventDefault();
    if (e.target.parentElement.className === 'active') {
      return null
    } else {
      this.props.filter(e.target.innerText)
    }
  }


  render() {
    let contacts = this.props.data
    let allContacts = this.props.tabs["All Contacts"]
    let friendly = this.props.tabs["Friendly"]
    let corp = this.props.tabs["Corp"]
    if (this.props.submitStatus) { 
      var submission = true 
    } else { var submission = false }
    
    return(
      <div className="list-group col-md-4 col-md-offset-1">
        <h1 className="h1 text-center">Contacts</h1>
        <ul className="nav nav-tabs">
          <li role="presentation" className={allContacts} onClick={this.handleClick}><a href="#">All Contacts</a></li>
          <li role="presentation" className={friendly} onClick={this.handleClick}><a href="#">Friendly</a></li>
          <li role="presentation" className={corp} onClick={this.handleClick}><a href="#">Corp</a></li>
        </ul>
        {contacts.map((contact, i) =>
          <Contact key={i} data={contact} contactClicked={this.updateRecip} submit={submission} />
        )}
      </div>
      )
  }
}
