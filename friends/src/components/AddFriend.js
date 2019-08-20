import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const AddFriend = ({ setFriends }) => {
  const [newFriend, setNewFriend] = useState({ name: "", age: "", email: "" });

  const handleChange = e => {
    setNewFriend({ ...newFriend, [e.target.name]: e.target.value });
  };

  const addFriend = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("http://localhost:5000/api/friends", newFriend)
      .then(res => {
        setFriends(res.data);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  return (
    <div className="add-form">
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
