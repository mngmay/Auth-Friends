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
      <AddFriend
        setFriends={setFriends}
        loading={loading}
        setLoading={setLoading}
      />
      {loading && (
        <div className="loading-msg">
          <ClipLoader loading={loading} />
        </div>
      )}
      {friends.map(friend => (
        <div key={friend.id}>
          {friend.name} {friend.age} {friend.email} <button>Edit</button>{" "}
          <button>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
