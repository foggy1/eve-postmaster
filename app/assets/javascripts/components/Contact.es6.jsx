class Contact extends React.Component {

  componentWillMount() {
    if (this.props.data.standing > 0) {
      this.props.data.status = "list-group-item-info"
    } else if (this.props.data.standing < 0) {
      this.props.data.status = "list-group-item-danger"
    } else { this.props.data.status = "list-group-item-warning"}
  }

  render() {
    let { name, status } = this.props.data
    return(
        <a href="#" className={"list-group-item list-group-item-action " + status}>{name}</a>
      )
  }
}