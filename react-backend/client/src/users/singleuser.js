import React from "react";
import axios from "axios";

class SingleUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      newName: props.user.username
    };
  }

  switchMode = () => {
    const lastMode = this.state.editing;

    this.setState({
      editing: !lastMode
    });
  };

  handleChange = e => {
    this.setState({
      newName: e.target.value
    });
  };

  submitForm = e => {
    e.preventDefault();
    const { newName } = this.state;
    const { id } = this.props.user;
    axios
      .patch(`/users/${id}/edit`, {
        id: id,
        newName: newName
      })
      .then(() => {
        // this.props.updateUserName(id, newName);
        this.props.fetchUsers();
        this.switchMode();
      });
  };

  render() {
    let { editing, newName } = this.state;

    if (!editing) {
      return (
        <div>
          <h3> {this.props.user.username} </h3>
          <button onClick={this.switchMode}> Edit </button>
        </div>
      );
    } else {
      return (
        <div>
          <form onSubmit={this.submitForm}>
            <label>
              New Username:
              <input
                value={newName}
                type="text"
                name="username"
                onChange={this.handleChange}
              />
            </label>

            <input type="submit" value="Submit" />
          </form>

          <button onClick={this.switchMode}> Cancel </button>
        </div>
      );
    }
  }
}

export default SingleUser;
