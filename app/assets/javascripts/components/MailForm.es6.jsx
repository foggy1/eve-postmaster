class MailForm extends React.Component {
  render() {
    // Move Submit listener down this component to allow App to handle delegation
    return(
        <div className="row">
          <form className="col-md-6" ref="newMailForm" onSubmit={this.getIDs}>
            <div className="form-group">
              <label htmlFor="recipients">To:</label>
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