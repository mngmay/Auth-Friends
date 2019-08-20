import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const AddFriend = ({ setFriends }) => {
  const [newFriend, setNewFriend] = useState({
    name: "",
    age: "",
    email: ""
  });
  const [friendToEdit, setFriendToEdit] = useState({});

  const handleChange = e => {
    if (e.target.name === "age") {
      setNewFriend({
        ...newFriend,
        [e.target.name]: Number(e.target.value)
      });
    } else {
      setNewFriend({
        ...newFriend,
        [e.target.name]: e.target.value
      });
    }
  };

  const addFriend = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("http://localhost:5000/api/friends", newFriend)
      .then(res => {
        setFriends(res.data);
      })
      .catch(err => console.log(err.response));
  };

  return (
    <div className="friend-form">
      <form onSubmit={addFriend}>
        <input
          type="text"
          name="name"
          placeholder="Friend's Name"
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <button>Add Friend</button>
      </form>
    </div>
  );
};

export default AddFriend;
