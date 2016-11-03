class App extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: []
    };
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
        <ContactList />
      </div>
      )
  }
}