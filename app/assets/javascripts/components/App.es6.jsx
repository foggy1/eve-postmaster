class App extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      recipients: [],
      remove: ""
    };
    this.changeRecip = this.changeRecip.bind(this)
  }

  changeRecip(recipient) {
    var isRecipient = function(name) {
      return recipient === name
    }
    var present = this.state.recipients.findIndex(isRecipient)
    if (present === -1) {
      this.setState({recipients: [...this.state.recipients, recipient]})
    } else {
      this.setState({recipients: this.state.recipients.splice(present, 1)},
      this.setState({remove: recipient})
        )
    }
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
        <MailForm />
        <ContactList data={this.state.contacts} updateTo={this.changeRecip}/>
      </div>
      )
  }
}