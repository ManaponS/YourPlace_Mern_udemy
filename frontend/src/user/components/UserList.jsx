import React from "react";

import UserItem from "./UserItem";
import "./UsersList.css";

function UserList(props) {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No user found</h2>
      </div>
    );
  }
  return (
    <ul className="users-list">
      {props.items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places.length}
        />
      ))}
    </ul>
  );
}

export default UserList;
