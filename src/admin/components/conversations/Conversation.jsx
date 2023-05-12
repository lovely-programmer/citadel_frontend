import axios from "axios";
import { useEffect, useState } from "react";
import "./Conversation.css";
import PersonIcon from "../../../assets/person_icon.png";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // const MY_API = "http://localhost:5000/api/";

  const MY_API = "https://citadel-new-backend.onrender.com/api/";

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get(
          MY_API + "users/getOne/?userId=" + friendId
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img className="conversationImg" src={PersonIcon} alt="" />
      <span className="conversationName">
        {user?.username || "Visiting User"}
      </span>
    </div>
  );
}
