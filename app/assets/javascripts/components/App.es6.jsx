class App extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      recipients: [],
      remove: "",
      submitted: false,
      contactTabs: {"All Contacts": "active",
                    "Friendly": "",
                    "Corp": ""}
    };
    this.changeRecip = this.changeRecip.bind(this);
    this.handleContacts = this.handleContacts.bind(this);
    this.filterContacts = this.filterContacts.bind(this);
    this.updateTab = this.updateTab.bind(this);
  }

  changeRecip(recipient) {
    if (!recipient) { 
      this.setState({submitted: false})
      return null
    }
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

  filterContacts(newTab) {
    this.updateTab(newTab);

  }

  updateTab(newTab) {
    tabDup = this.state.contactTabs;
    for (var key in tabDup) {
      tabDup[key] = ""; 
    }
    tabDup[newTab] = "active"
    this.setState({contactTabs: tabDup})
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
        <ContactList data={this.state.contacts} updateTo={this.changeRecip} submitStatus={this.state.submitted} filter={this.filterContacts} tabs={this.state.contactTabs} />
      </div>
      )
  }
}