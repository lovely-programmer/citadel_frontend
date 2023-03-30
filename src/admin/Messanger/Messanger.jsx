import Conversation from "../components/conversations/Conversation";
import Message from "../../components/message/Message";
// import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { getMe, reset } from "../../features/auth/user";
import { useSelector, useDispatch } from "react-redux";
import "./Messanger.css";
import AdminWrapper from "../components/AdminWrapper";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const socket = useRef();

  const { adminUser } = useSelector((state) => state.auth);

  console.log(adminUser._id);

  // const MY_API = "http://localhost:5000/api/";

  const MY_API = "https://citadel-backend.onrender.com/api/";

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
    socket.current.emit("addUser", adminUser?._id);

    socket.current.on("getUsers", (users) => {
      // console.log(users);
    });
  }, [adminUser?._id]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(MY_API + "conversations/" + adminUser?._id);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getConversations();
  }, [adminUser]);

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
  }, [adminUser, currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      sender: adminUser._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member._id !== adminUser?._id
    );

    socket.current.emit("sendMessage", {
      senderId: adminUser?._id,
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

  return (
    <AdminWrapper>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {/* <input placeholder="Search for friends" className="chatMenuInput" /> */}
            {conversations.map((c, index) => (
              <div key={index} onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={adminUser} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m, index) => (
                    <div key={index} ref={scrollRef}>
                      <Message message={m} own={m.sender === adminUser._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        {/* <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div> */}
      </div>
    </AdminWrapper>
  );
}
