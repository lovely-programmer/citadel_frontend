import { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { io } from "socket.io-client";
import Message from "../message/Message";
import { useSelector, useDispatch } from "react-redux";
import { getMe, reset } from "../../features/auth/user";
import axios from "axios";
import emailjs from "@emailjs/browser";

function Chat() {
  const scrollRef = useRef();

  const form = useRef();

  const [conversations, setConversations] = useState([]);

  const [arrivalMessage, setArrivalMessage] = useState(null);

  const [currentChat, setCurrentChat] = useState(null);

  const [newMessage, setNewMessage] = useState("");

  const [messages, setMessages] = useState();

  const [startConversation, setStartConversation] = useState(false);

  const [getLocalConversation, setGetLocalConversation] = useState(null);

  // const MY_API = "http://localhost:5000/api/";

  const MY_API = "https://citadel-new-backend.onrender.com/api/";

  const { user, isLoading, isSuccess } = useSelector((state) => state.auth);

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
  }, [user._id, startConversation]);

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
  }, [user, currentChat, startConversation]);

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
      conversationId: currentChat?._id,
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

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const conversation = localStorage.getItem("conversation")
      ? JSON.parse(localStorage.getItem("conversation"))
      : null;
    setGetLocalConversation(conversation);
  }, []);

  const updateConversation = async (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_etz18uk",
        "template_i4x4bjg",
        form.current,
        "user_AnjF4Y8dbderf60LOsMSF"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
          toast.error(error.text);
        }
      );

    setStartConversation(true);

    try {
      const res = await axios.post(MY_API + "conversations", {
        senderId: user._id,
        receiverId: "6426be779b79d2d3a3cb2feb",
      });

      localStorage.setItem("conversation", JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <h3>Messages</h3>
      </div>
      <div className="chat__container">
        {currentChat || startConversation || getLocalConversation ? (
          <>
            <div className="messages">
              {messages?.map((m, index) => (
                <div key={index} ref={scrollRef}>
                  <Message message={m} own={m.sender === user?._id} />
                </div>
              ))}
            </div>
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
          </>
        ) : (
          <>
            <div className="no__messages">
              <form style={{ display: "none" }} ref={form}>
                <input
                  readOnly
                  value={user?.username}
                  type="text"
                  name="user_name"
                />
                <input
                  readOnly
                  value={user?.email}
                  type="text"
                  name="user_email"
                />
                <textarea
                  readOnly
                  value={`${user?.username} started a conversation with you`}
                  type="text"
                  name="message"
                />
              </form>
              <h4>No messages</h4>
              <p>Messages from the team will show here</p>
            </div>
            <div onClick={updateConversation} className="start__conversion">
              <button>Start a conversation</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Chat;
