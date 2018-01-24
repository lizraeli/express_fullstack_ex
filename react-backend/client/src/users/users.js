import React from "react";
import { Route, Link } from "react-router-dom";
import UserList from "./userlist";
import NewUser from "./newuser";
import SingleUser from "./singleuser";

class Users extends React.Component {
  state = { users: [] };

  fetchUsers = () => {
    fetch("/users")
      .then(res => res.json())
      .then(users => {
        let data = users.data;
        this.setState({ users: data });
      });
  };

  componentDidMount() {
    this.fetchUsers();
  }

  updateUsername = (id, newUserName) => {
    console.log("updateUserName: id ", id, "newusername: ", newUserName);
    const { users } = this.state;
    const newUsers = [...users];

    newUsers.forEach(user => {
      if (user.id === Number(id)) {
        user.username = newUserName;
      }
    });

    this.setState({
      users: newUsers
    });
  };

  renderUserList = () => {
    const { users } = this.state;

    return <UserList users={users} />;
  };

  renderUser = props => {
    const { id } = props.match.params;
    const { users } = this.state;

    if (users.length === 0) {
      return <div> Fetching Users... </div>;
    }

    const selectedUser = users.find(user => {
      return user.id === Number(id);
    });

    if (!selectedUser) {
      return <div> User not found </div>;
    }

    console.log("selectedUser: ", selectedUser);
    return (
      <SingleUser
        user={selectedUser}
        updateUserName={this.updateUsername}
        fetchUsers={this.fetchUsers}
      />
    );
  };

  render() {
    console.log("<Users /> user array: ", this.state.users);
    return (
      <div className="App">
        <nav>
          <Link to="/users"> User List </Link>
          <Link to="/users/new"> Add New User </Link>
        </nav>

        <Route exact path="/users" render={this.renderUserList} />
        <Route path="/users/new" component={NewUser} />
        <Route path="/users/:id/edit" render={this.renderUser} />
      </div>
    );
  }
}

export default Users;
