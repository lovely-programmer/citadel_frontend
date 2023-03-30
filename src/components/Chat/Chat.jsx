import { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { io } from "socket.io-client";
import Message from "../message/Message";
import { useSelector, useDispatch } from "react-redux";
import { getMe, reset } from "../../features/auth/user";
import axios from "axios";

function Chat() {
  const scrollRef = useRef();

  const [conversations, setConversations] = useState([]);

  const [arrivalMessage, setArrivalMessage] = useState(null);

  const [currentChat, setCurrentChat] = useState(null);

  const [newMessage, setNewMessage] = useState("");

  const [messages, setMessages] = useState();

  // const MY_API = "http://localhost:5000/api/";

  const MY_API = "https://citadel-backend.onrender.com/api/transaction/";

  const { user } = useSelector((state) => state.auth);

  const socket = useRef();

  useEffect(() => {
    conversations?.map((c) => {
      setCurrentChat(c);
    });
  }, [currentChat, conversations]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(MY_API + "conversations/" + user?._id);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getConversations();
  }, [user._id]);

  console.log(user._id);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(MY_API + "messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMessages();
  }, [user, currentChat?._id]);

  console.log(messages);

  useEffect(() => {
    socket.current = io("http://localhost:3000");

    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user?._id);

    socket.current.on("getUsers", (users) => {
      // console.log(users);
    });
  }, [user]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      sender: user?._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member._id !== user?._id
    );

    socket.current.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(MY_API + "messages", message);
      setMessages([...messages, res.data]);
    } catch (error) {
      console.log(error);
    }

    setNewMessage("");
  };

  // useEffect(() => {
  //   dispatch(getMe());
  //   return () => {
  //     dispatch(reset());
  //   };
  // }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat__header">
        <h3>Messages</h3>
      </div>
      <div className="chat__container">
        {currentChat ? (
          <>
            <div className="messages">
              {messages?.map((m, index) => (
                <div key={index} ref={scrollRef}>
                  <Message message={m} own={m.sender === user?._id} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="no__messages">
            <h4>No messages</h4>
            <p>Messages from the team will show here</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="chat__input">
            <input
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
              type="text"
              placeholder="Start Typing..."
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat;
