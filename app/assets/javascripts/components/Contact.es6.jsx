class Contact extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this)
    this.colorify = this.colorify.bind(this)
  }

  colorify() {
    if (this.props.data.standing > 0) {
      this.props.data.status = "list-group-item-info"
    } else if (this.props.data.standing < 0) {
      this.props.data.status = "list-group-item-danger"
    } else { this.props.data.status = "list-group-item-warning"}
  }

  componentWillMount() {
    this.colorify();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.submit) {
      debugger;
    }
  }

  handleClick(e) {
    e.preventDefault();
    if (this.props.data.status != "list-group-item-success") {
      this.props.data.status = "list-group-item-success"
    } else {this.colorify()}
      this.props.contactClicked(this.props.data.name)
  }

  render() {
    let { name, status } = this.props.data
    return(
        <a href="#" className={"list-group-item list-group-item-action " + status} onClick={this.handleClick}>{name}</a>
      )
  }
}