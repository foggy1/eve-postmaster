class Contact extends React.Component {

  componentDidMount() {
    if (this.props.data.standing > 0) {
      this.props.status = "list-group-item-info"
    } else if (this.props.data.standing < 0) {
      this.props.status = "list-group-item-danger"
    } else { this.props.status = "list-group-item-warning"}
  }

  render() {
    let { name, status } = this.props.data
    return(
        <a href="#" className={"list-group-item list-group-item-action " + status}>{name}</a>
      )
  }
}