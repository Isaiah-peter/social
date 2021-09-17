import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Not = ({ n }) => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getUser();
  }, [n]);

  const getUser = async () => {
    const res = await axios.get(`http://localhost:8000/user/${n.TypeId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (n.user_id !== "") {
      setUsers(res.data);
    }
  };

  return (
    <Link to={`/profile/${users.username}`} className="link">
      <li className="notitem">
        {users.username} {n.Type}
      </li>
    </Link>
  );
};
