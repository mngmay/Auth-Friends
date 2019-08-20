import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import ClipLoader from "react-spinners/ClipLoader";

import AddFriend from "./AddFriend";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
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

  return (
    <div className="friends-list">
      <h1>List-O-Friends</h1>
      <AddFriend />
      {loading && (
        <div className="loading-msg">
          <ClipLoader loading={loading} />
        </div>
      )}
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
              <button>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendsList;
