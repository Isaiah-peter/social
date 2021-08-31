import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const Groupjoined = ({ g }) => {
  const [groupUser, SetGroupUser] = useState([]);
  const [groupId, setGroupId] = useState(null);
  const [gs, setG] = useState([]);

  const { user } = useContext(AuthContext);

  const getgroup = async () => {
    const res = await axios.get(`http://Localhost:8000/group/${user.user.ID}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setGroupId(...res.data);
  };

  useEffect(() => {
    getgroup();
    getgroupUser();
    getgroups();
  }, []);

  const getgroupUser = async () => {
    const res = await axios.get(
      `http://Localhost:8000/groupuser/${groupId.ID}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    SetGroupUser(res.data);
  };

  const getgroups = async () => {
    const res = await axios.get(
      `http://Localhost:8000/group/${groupUser.group_id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setG(...res.data);
  };

  console.log(gs);

  return (
    <div className="conversations">
      <span className="conversationsname">the band</span>
    </div>
  );
};
