class Cover extends React.Component {
  render () {
    return(
      <div className="container">
        <div className="row">
          <h1 className="h1 text-center">Eve Postmaster</h1>
        </div>
        <div className="row">
          <p className="lead text-center">Authorize us to let you send dope mailz out of game but really in game.</p>
        </div>
        <div className="row">
          <div className="col-md-4 col-md-offset-4 text-center">
            <a href="/authorize" className="btn btn-lg btn-default">Authorize</a>
          </div>
        </div>
      </div>
    )
  }

}
