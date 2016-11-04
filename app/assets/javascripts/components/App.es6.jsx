class App extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      recipients: [],
      remove: "",
      submitted: false
    };
    this.changeRecip = this.changeRecip.bind(this)
    this.handleContacts = this.handleContacts.bind(this)
  }

  changeRecip(recipient) {
    var isRecipient = function(name) {
      return recipient === name
    }
    var present = this.state.recipients.findIndex(isRecipient)
    if (present === -1) {
      this.setState({recipients: [...this.state.recipients, recipient]})
    } else {
      var clone = this.state.recipients
      clone.splice(present, 1)
      this.setState({recipients: clone})
    }
  }

  handleContacts(bool) {
    this.setState({recipients: []}, this.setState({submitted: bool}))
  }

  componentDidMount() {
    if (this.props.isAuthorized) {
      localStorage.access_token = this.props.tokens.access_token;
      localStorage.refresh_token = this.props.tokens.refresh_token;
    }
    this.setState({contacts: this.props.contacts})
  }

  render() {
    return(
      <div className="row">
        <MailForm data={this.state.recipients} submitDone={this.handleContacts}/>
        <ContactList data={this.state.contacts} updateTo={this.changeRecip} submitStatus={this.state.submitted} />
      </div>
      )
  }
}