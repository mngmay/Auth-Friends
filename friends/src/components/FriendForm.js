import React from "react";

const FriendForm = ({
  setFriends,
  friendToEdit,
  addFriend,
  editFriend,
  handleChange,
  newFriend,
  setNewFriend
}) => {
  return (
    <div className="friend-form">
      <form onSubmit={friendToEdit ? editFriend : addFriend}>
        <input
          type="text"
          name="name"
          placeholder="Friend's Name"
          value={friendToEdit ? friendToEdit.name : newFriend.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={friendToEdit ? friendToEdit.age : newFriend.age}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={friendToEdit ? friendToEdit.email : newFriend.email}
          onChange={handleChange}
        />
        <button>{friendToEdit ? "Update Friend" : "Add Friend"}</button>
      </form>
    </div>
  );
};

export default FriendForm;
