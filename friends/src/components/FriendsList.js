import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import ClipLoader from "react-spinners/ClipLoader";

import FriendForm from "./FriendForm";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newFriend, setNewFriend] = useState({
    name: "",
    age: "",
    email: ""
  });

  const [friendToEdit, setFriendToEdit] = useState("");

  const handleChange = e => {
    if (friendToEdit) {
      if (e.target.name === "age") {
        setFriendToEdit({
          ...friendToEdit,
          [e.target.name]: Number(e.target.value)
        });
      } else {
        setFriendToEdit({
          ...friendToEdit,
          [e.target.name]: e.target.value
        });
      }
    } else {
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
    }
  };

  useEffect(() => {
    getData();
    deleteFriend();
  }, []);

  const getData = () => {
    setLoading(true);
    axiosWithAuth()
      .get("http://localhost:5000/api/friends")
      .then(res => {
        setFriends(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err.response);
      });
  };

  const addFriend = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("http://localhost:5000/api/friends", newFriend)
      .then(res => {
        setFriends(res.data);
      })
      .catch(err => console.log(err.response));
    setNewFriend({ name: "", age: "", email: "" });
  };

  const deleteFriend = id => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/friends/${id}`)
      .then(res => {
        setFriends(res.data);
      })
      .catch(err => console.log(err));
  };

  const editFriend = e => {
    e.preventDefault();
    friendToEdit &&
      axiosWithAuth()
        .put(
          `http://localhost:5000/api/friends/${friendToEdit.id}`,
          friendToEdit
        )
        .then(res => {
          setFriends(res.data);
        })
        .catch(err => console.log(err));
    setFriendToEdit("");
  };

  return (
    <div className="friends-list">
      <FriendForm
        setFriends={setFriends}
        friendToEdit={friendToEdit}
        handleChange={handleChange}
        addFriend={addFriend}
        editFriend={editFriend}
        newFriend={newFriend}
        setNewFriend={setNewFriend}
      />

      <div className="categories">
        <div className="name">
          <span className="category-name">Name</span>
          {friends.map(friend => (
            <div key={friend.id}>{friend.name}</div>
          ))}
        </div>
        <div className="age">
          <span className="category-name">Age</span>
          {friends.map(friend => (
            <div key={friend.id}>{friend.age}</div>
          ))}
        </div>
        <div className="email">
          <span className="category-name">Email</span>
          {friends.map(friend => (
            <div key={friend.id}>{friend.email}</div>
          ))}
        </div>
        <div className="buttons">
          <span className="category-name">Edit/Delete</span>
          {friends.map(friend => (
            <div key={friend.id}>
              <button onClick={() => setFriendToEdit(friend)}>Edit</button>
              <button
                onClick={() => {
                  deleteFriend(friend.id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      {loading && (
        <div className="loading-msg">
          <ClipLoader loading={loading} />
        </div>
      )}
    </div>
  );
};

export default FriendsList;
