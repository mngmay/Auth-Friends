import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import ClipLoader from "react-spinners/ClipLoader";

import AddFriend from "./AddFriend";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);

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
        console.log(res.data);
      })
      .catch(err => {
        setLoading(false);
        console.log(err.response);
      });
  };

  const deleteFriend = id => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/friends/${id}`)
      .then(res => {
        setFriends(res.data);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="friends-list">
      <h1>List-O-Friends</h1>
      <AddFriend setFriends={setFriends} />

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
              <button>Edit</button>
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
