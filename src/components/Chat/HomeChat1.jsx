import { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { io } from "socket.io-client";
import Message from "../message/Message";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import emailjs from "@emailjs/browser";

function HomeChat1() {
  const scrollRef = useRef();
  const form = useRef();

  const [ifUserVisited, setIfUserVisited] = useState(null);
  const [userDetail, setUserDetail] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    const user = localStorage.getItem("visited_user_details");
    user && setIfUserVisited(JSON.parse(user));
  }, []);

  const [conversations, setConversations] = useState([]);

  const [arrivalMessage, setArrivalMessage] = useState(null);

  const [currentChat, setCurrentChat] = useState(null);

  const [newMessage, setNewMessage] = useState("");

  const [messages, setMessages] = useState();

  const [startConversation, setStartConversation] = useState(false);

  const [getLocalConversation, setGetLocalConversation] = useState(null);

  // const MY_API = "http://localhost:5000/api/";

  const MY_API = "https://citadel-backend.onrender.com/api/";

  const socket = useRef();

  useEffect(() => {
    conversations?.map((c) => {
      setCurrentChat(c);
    });
  }, [currentChat, conversations]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          MY_API + "conversations/" + ifUserVisited?.userId
        );
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getConversations();
  }, [userDetail.userId, ifUserVisited?.userId, startConversation]);

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
  }, [userDetail.userId, currentChat, startConversation]);

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
    socket.current.emit("addUser", userDetail.userId || ifUserVisited?.userId);

    socket.current.on("getUsers", (users) => {
      // console.log(users);
    });
  }, [userDetail.userId, ifUserVisited?.userId]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      sender: userDetail.userId || ifUserVisited?.userId,
      text: newMessage,
      conversationId: currentChat?._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member._id !== userDetail.userId || ifUserVisited?.userId
    );

    socket.current.emit("sendMessage", {
      senderId: userDetail.userId || ifUserVisited?.userId,
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
    const conversation = localStorage.getItem("conversation__visit")
      ? JSON.parse(localStorage.getItem("conversation__visit"))
      : null;
    setGetLocalConversation(conversation);
  }, []);

  const updateConversation = async (e) => {
    e.preventDefault();

    setStartConversation(true);

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

    const userId = uuidv4();

    setUserDetail({ username, email, userId });

    localStorage.setItem(
      "visited_user_details",
      JSON.stringify({ userId, username, email })
    );

    try {
      const res = await axios.post(MY_API + "conversations", {
        senderId: userId,
        receiverId: "6426be779b79d2d3a3cb2feb",
      });

      localStorage.setItem("conversation__visit", JSON.stringify(res.data));
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
        {currentChat ||
        startConversation ||
        getLocalConversation ||
        ifUserVisited ? (
          <>
            <div className="messages">
              {messages?.map((m, index) => (
                <div key={index} ref={scrollRef}>
                  <Message
                    message={m}
                    own={m.sender === ifUserVisited?.userId}
                  />
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
            <div style={{ height: "70%" }} className="no__messages">
              <form
                onSubmit={updateConversation}
                ref={form}
                style={{ width: "100%" }}
              >
                <h4
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  Enter Full Name
                </h4>

                <div style={{ width: "100%", marginBottom: "20px" }}>
                  <input
                    type="text"
                    name="user_name"
                    required
                    style={{
                      width: "100%",
                      outline: "none",
                      padding: "20px",
                      borderRadius: "10px",
                    }}
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                </div>
                <h4
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  Enter Email Address
                </h4>
                <div style={{ width: "100%" }}>
                  <input
                    type="email"
                    name="user_email"
                    required
                    style={{
                      width: "100%",
                      outline: "none",
                      padding: "20px",
                      borderRadius: "10px",
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>

                <div style={{ display: "none" }}>
                  <textarea
                    readOnly
                    value={`${username} started a conversation with you`}
                    name="message"
                  />
                </div>

                <div
                  style={{ marginTop: "15px" }}
                  className="start__conversion"
                >
                  <button>Start a conversation</button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HomeChat1;
