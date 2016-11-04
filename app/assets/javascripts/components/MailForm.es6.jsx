class MailForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getIDs = this.getIDs.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.refs.contactBox.value = nextProps.data.join(',')
    
  }

  getIDs(e) {
    e.preventDefault();
    var params = {
      "names": this.refs.recipBox.value + ',' + this.refs.contactBox.value
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
      theForm.refs.contactBox.value = ''
      theForm.refs.recipBox.value = '';
      theForm.refs.subjectBox.value = '';
      theForm.refs.bodyBox.value = '';
    })  
  }
  render() {
    // Move Submit listener down this component to allow App to handle delegation
    return(
        <div className="col-md-6">
          <form ref="newMailForm" onSubmit={this.getIDs}>
            <div className="form-group">
              <label htmlFor="recipients">Contacts: (<em>select on right</em>)</label>
              <input ref="contactBox" className="form-control" type="text" name="recipients" />
            </div>
                        <div className="form-group">
              <label htmlFor="recipients">Other recipients: (<em>separate names with commas only</em>)</label>
              <input ref="recipBox" className="form-control" type="text" name="recipients" />
            </div>
            <div className ="form-group">
              <label htmlFor="subject">Subject:</label>
              <input ref="subjectBox" className="form-control" type="text" name="subject" />
            </div>
            <div className="form-group">
              <label htmlFor="body">Message:</label>
              <textarea ref="bodyBox" className="form-control" name="body" rows="6"></textarea>
            </div>
            <div className="text-center">
              <input className="btn btn-default" type="submit" value="Send" />
            </div>
          </form>
        </div>
      )
  }
}