import PersonIcon from "../../assets/person_icon.png";
import { format } from "timeago.js";

function Message({ message, own }) {
  return (
    <div className={own ? "message__container own" : "message__container"}>
      <div className="message__content">
        <div className="message__img">
          <img src={PersonIcon} />
        </div>
        <div className="message__text">
          <p>{message.text}</p>
        </div>
      </div>
      <div className="message__time">{format(message.createdAt)}</div>
    </div>
  );
}

export default Message;
