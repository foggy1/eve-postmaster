class ContactList extends React.Component {
  constructor(){
    super();
    this.updateRecip = this.updateRecip.bind(this)
  }

  updateRecip(recipient) {
    this.props.updateTo(recipient)
  }


  render() {
    let contacts = this.props.data
    if (this.props.submitStatus) { 
      var submission = true 
    } else { var submission = false }
    
    return(
      <div className="list-group col-md-2 col-md-offset-2">
        <h1 class="h1 text-center">Contacts</h1>
        {contacts.map((contact, i) =>
          <Contact key={i} data={contact} contactClicked={this.updateRecip} submit={submission} />
        )}
      </div>
      )
  }
}