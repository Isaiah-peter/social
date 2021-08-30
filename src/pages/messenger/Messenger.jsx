import "./message.css";
import Topbar from "../../component/topbar/Topbar";
import { Conversations } from "../../component/conversations/Conversations";
import { Message } from "../../component/message/Message";
import HomeRightBar from "../../component/homerightbar/homerightbar";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../component/context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

const Messenger = () => {
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arriverMesage, setArriverMesage] = useState(null);
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);
  const scrollref = useRef();

  useEffect(() => {
    socket.current = io("ws://192.168.88.156:8900");
  }, []);

  useEffect(() => {
    arriverMesage && setMessages((prev) => [...prev, arriverMesage]);
    socket.current.on("getMessage", (data) => {
      setArriverMesage({
        sender: data.senderId,
        text: data.text,
        CreatedAt: Date.now(),
      });
    });
  }, [arriverMesage, currentChat]);

  console.log(arriverMesage);

  useEffect(() => {
    socket.current.emit("addUser", user.user.ID);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  useEffect(() => {
    getConversation();
    getMessage();
  }, [user.user.ID, currentChat]);

  useEffect(() => {
    scrollref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getConversation = async () => {
    const res = await axios.get(
      `http://192.168.88.156:8000/getconversation/${user.user.ID}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setConversation(res.data);
  };

  const getMessage = async () => {
    try {
      const res = await axios.get(
        `http://192.168.88.156:8000/message/${currentChat.ID}`,
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
      const res = await axios.post(
        "http://192.168.88.156:8000/message",
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
            {conversation.map((c) => {
              return (
                <div key={c.ID} onClick={() => setCurrentChat(c)}>
                  <Conversations conversation={c} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="chatBox">
          {currentChat ? (
            <>
              <div className="chatBoxWrapper">
                <div className="chatboxTop">
                  {messages.map((m) => {
                    return (
                      <div key={m.ID} ref={scrollref}>
                        <Message
                          key={m.ID}
                          own={m.sender === user.user.ID}
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
            <HomeRightBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
