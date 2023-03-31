import { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { io } from "socket.io-client";
import Message from "../message/Message";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

function Chat() {
  const scrollRef = useRef();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [ifUserVisited, setIfUserVisited] = useState(null);
  const [userDetail, setUserDetail] = useState({});

  useEffect(() => {
    const user = localStorage.getItem("visited_user_details");
    user && setIfUserVisited(JSON.parse(user));
  }, []);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  const [startConversation, setStartConversation] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMessage == "") {
      toast.error("Please enter a valid message");
      return;
    }

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      name: userDetail.username || ifUserVisited?.username,
      _id: userDetail.userId || ifUserVisited?.userId,
      createdAt: serverTimestamp(),
    });

    setNewMessage("");
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const updateConversation = async (e) => {
    e.preventDefault();

    setStartConversation(true);

    const userId = uuidv4();
    const username = "olaoluwa";

    setUserDetail({ username, userId });

    localStorage.setItem(
      "visited_user_details",
      JSON.stringify({ userId, username })
    );
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <h3>Messages</h3>
      </div>
      <div className="chat__container">
        {startConversation || messages.length < 0 || ifUserVisited ? (
          <>
            <div className="messages">
              {messages?.map((message) => (
                <div key={message?._id} ref={scrollRef}>
                  <Message
                    message={message}
                    own={message?._id === ifUserVisited?.userId}
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
            <div style={{ height: "25%" }} className="no__messages">
              <h4
                style={{
                  width: "100%",
                  textAlign: "left",
                  marginLeft: "105px",
                }}
              >
                Enter Full Name
              </h4>
              <div style={{ width: "100%" }}>
                <input
                  type="text"
                  style={{
                    width: "80%",
                    outline: "none",
                    padding: "20px",
                    borderRadius: "10px",
                  }}
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
            </div>
            <div className="start__conversion">
              <button onClick={updateConversation}>Start a conversation</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Chat;
