import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import AddFriend from "./AddFriend";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axiosWithAuth()
      .get("http://localhost:5000/api/friends")
      .then(res => {
        setFriends(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err.response));
  };

  return (
    <div className="friends-list">
      <AddFriend />
      {friends.map(friend => (
        <li key={friend.id}>{friend.name}</li>
      ))}
    </div>
  );
};

export default FriendsList;
