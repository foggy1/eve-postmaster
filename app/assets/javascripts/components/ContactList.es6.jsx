class ContactList extends React.Component {
  render() {
    let contacts = this.props.data
    return(
      <div className="list-group col-md-4 col-md-offset-2">
        {contacts.map((contact, i) =>
          <Contact key={i} data={contact} />
        )}
      </div>
      )
  }
}