import "./message.css";
import Topbar from "../../component/topbar/Topbar";
import { Conversations } from "../../component/conversations/Conversations";
import { Message } from "../../component/message/Message";
import HomeRightBar from "../../component/homerightbar/homerightbar";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../component/context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import { Groupowned } from "../../component/group/Groupowned";
import MicNoneIcon from "@material-ui/icons/MicNone";

const Messenger = () => {
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arriverMesage, setArriverMesage] = useState(null);
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);
  const scrollref = useRef();
  const [group, setGroup] = useState([]);
  const [groupchat, setGroupChat] = useState(false);
  const [onlineUser, setOnlineUser] = useState([]);
  const [follower, setFollower] = useState([]);
  const [groupInput, setGroupInput] = useState("");
  const [create, setCreate] = useState(false);

  useEffect(() => {
    getgroup();
    getFollower();
  }, []);

  const getFollower = async () => {
    const res = await axios.get(
      `http://localhost:8000//follower/${user.user.ID}`,
      {
        headers: {
          Authorization: `Bearer ${user.token} `,
        },
      }
    );
    setFollower(res.data);
  };

  const getgroup = async () => {
    const res = await axios.get(
      `http://Localhost:8000/groupuser/${user.user.ID}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setGroup(res.data);
  };

  useEffect(() => {
    socket.current = io("ws://social-ground-chat.herokuapp.com/");
    socket.current.on("getMessage", (data) => {
      setArriverMesage({
        sender: data.senderId,
        text: data.text,
        CreatedAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    if (arriverMesage) {
      if (
        currentChat.recieve_id === arriverMesage.sender ||
        currentChat.sender_id === arriverMesage.sender
      ) {
        setMessages((prev) => [...prev, arriverMesage]);
      }
    }
  }, [arriverMesage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user.user.ID);
    socket.current.on("getUsers", (users) => {
      setOnlineUser(
        follower.filter((f) => users.some((u) => u.userId === f.ID))
      );
    });
  }, [follower]);

  useEffect(() => {
    getConversation();
    if (groupchat == false) {
      getMessage();
    }
    if (groupchat === true) {
      getGroupMessage();
    }
  }, [user.user.ID, currentChat, groupchat]);

  useEffect(() => {
    scrollref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getConversation = async () => {
    const res = await axios.get(
      `http://localhost:8000/getconversation/${user.user.ID}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setConversation(res.data);
  };

  const getGroupMessage = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/groupmessage/${currentChat.group_id}`,

        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateGroup = async () => {
    const data = {
      nameofgroup: groupInput,
    };
    try {
      if (groupInput !== "") {
        await axios.post(
          `http://localhost:8000/group`,
          data,

          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setCreate(!create);
        getgroup();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMessage = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/message/${currentChat.ID}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!groupchat) {
      const message = {
        conversation_id: currentChat.ID,
        sender: user.user.ID,
        text: newMessage,
      };
      const receiverId =
        currentChat.recieve_id !== user.user.ID
          ? currentChat.recieve_id
          : currentChat.sender_id;
      console.log(receiverId);
      socket.current.emit("sendMessage", {
        senderId: user.user.ID,
        receiverId,
        text: newMessage,
      });

      try {
        const res = await axios.post("http://localhost:8000/message", message, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setMessages([...messages, res.data]);
        setNewMessage("");
      } catch (error) {
        console.log(error);
      }
    } else {
      const message = {
        group_id: currentChat.group_id,
        user_id: user.user.ID,
        message: newMessage,
      };

      try {
        const res = await axios.post(
          "http://localhost:8000/groupmessage",
          message,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setMessages([...messages, res.data]);
        setNewMessage("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recongnition = new window.SpeechRecognition();
  recongnition.interimResults = true;

  recongnition.addEventListener("result", (e) => {
    const text = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");

    setNewMessage(text);
  });

  const handleStart = () => {
    recongnition.start();
  };

  const addFriends = async (friendId) => {
    const data = {
      user_id: friendId,
      group_id: currentChat.group_id,
    };

    await axios.post("http://localhost:8000/addfriend", data, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  };

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="Search friends...."
              className="searchfriend"
            />
            <div className="conversationpart">
              <h1 className="name">conversations</h1>
              {conversation.map((c) => {
                return (
                  <div
                    key={c.ID}
                    onClick={() => {
                      setCurrentChat(c);
                      setGroupChat(false);
                    }}
                  >
                    <Conversations conversation={c} follower={follower} />
                  </div>
                );
              })}
            </div>
            <div className="grouppart">
              <h1 className="name">Group</h1>
              <button
                className="creategroupchat"
                onClick={() => setCreate(!create)}
              >
                Create group chat
              </button>
              {create && (
                <div className="groupchatinputscontainer">
                  <input
                    type="text"
                    className="groupchatinput"
                    onChange={(e) => setGroupInput(e.target.value)}
                    placeholder=" Create a new group chat"
                  />
                  <button className="createbutton" onClick={handleCreateGroup}>
                    Create
                  </button>
                </div>
              )}
              {group.map((g) => {
                return (
                  <Groupowned
                    key={g.ID}
                    g={g}
                    groupchat={() => {
                      setGroupChat(true);
                    }}
                    currentChat={() => setCurrentChat(g)}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="chatBox">
          {currentChat ? (
            <>
              <div className="chatBoxWrapper">
                {groupchat && (
                  <div className="adduserscontainer">
                    <button className="adduserbutton">+</button>
                    <ul className="userfriendlist">
                      {follower.map((f) => {
                        return (
                          <li className="item" onClick={() => addFriends(f.ID)}>
                            {f.username}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                <div className="chatboxTop">
                  {messages.map((m) => {
                    return (
                      <div key={m.ID} ref={scrollref}>
                        <Message
                          key={m.ID}
                          own={
                            m.sender === user.user.ID ||
                            m.user_id === user.user.ID
                          }
                          message={m}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="chatboxButtom">
                  <textarea
                    className="chatmessageinput"
                    placeholder="write message"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="sendmessage" onClick={handleSubmit}>
                    send
                  </button>
                  <button className="talk" onClick={handleStart}>
                    <MicNoneIcon />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <span className="noConversationText">
              Open a conversations to start a chat
            </span>
          )}
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <HomeRightBar
              onlineUser={onlineUser}
              currentId={user.user.ID}
              currentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
