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
      <div className="list-group col-md-4 col-md-offset-2">
        {contacts.map((contact, i) =>
          <Contact key={i} data={contact} contactClicked={this.updateRecip} submit={submission} />
        )}
      </div>
      )
  }
}