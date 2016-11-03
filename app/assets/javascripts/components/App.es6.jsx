class App extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderAuthForm = this.renderAuthForm.bind(this);
    this.getIDs = this.getIDs.bind(this)
  }

  renderAuthForm() {
    if (this.props.isAuthorized || localStorage.access_token) {
      return(
        <MailForm />
        )
    } else {
      return(
        <h1 class="h1 text-center">You shouldn't be here, lol</h1>
        )
    }
    }

  getIDs(e) {
    e.preventDefault();
    var params = {
      "names": this.refs.recipBox.value
    }
    $.ajax({
      method: 'get',
      url: 'https://api.eveonline.com/eve/CharacterID.xml.aspx?',
      data: $.param(params)
    })
    .done(response => {
      var chars = Array.from($(response).find("rowset").children())
      var iDs = chars.map(child => child.getAttribute("characterID"))
      this.handleSubmit(iDs)
    })
  }

  handleSubmit(iDs) {
    var theForm = this;
    var parameters = {
      "recipients": JSON.stringify(iDs),
      "subject": this.refs.subjectBox.value,
      "body": this.refs.bodyBox.value
    }
    $.ajax({
      method: 'post',
      url: '/mails/create',
      data: parameters
    })
    .done(response => {
      theForm.refs.recipBox.value = '';
      theForm.refs.subjectBox.value = '';
      theForm.refs.bodyBox.value = '';
    })  
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
    <div>
      { this.renderAuthForm() }
    </div>
      )
  }
}