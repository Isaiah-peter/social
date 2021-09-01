import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./group.css";

export const Groupowned = ({ g, currentChat, groupchat }) => {
  const [group, setGroup] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getgroup();
  }, []);

  const getgroup = async () => {
    const res = await axios.get(
      `http://Localhost:8000/groupuserjoin/${g.group_id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setGroup(res.data);
  };

  return (
    <div className="group">
      {group.map((g) => {
        return (
          <span
            key={g.ID}
            className="groupname"
            onClick={() => {
              currentChat(g);
              groupchat(true);
            }}
          >
            {g.nameofgroup}
          </span>
        );
      })}
    </div>
  );
};
