import React from "react";
import { Link } from "react-router-dom";

const UserList = props => {
  const { users } = props;

  return (
    <div>
      <h1>Users</h1>
      {users.map(user => {
        let path = `/users/${user.id}/edit`;
        return (
          <Link key={user.id} to={path}>
            <div>{user.username}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default UserList;
