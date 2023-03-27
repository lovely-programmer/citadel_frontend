import "./Mobile.css";
import MobileApp from "../../assets/mobile.jpeg";

function Mobile() {
  return (
    <div className="mobile">
      <div className="mobile__container">
        <div className="mobile__image">
          <img src={MobileApp} alt="" />
        </div>
        <div className="mobile__content">
          <div>
            <h1>Banking in the palm of your hand</h1>
            <p>
              Our Citadel Choice Bank(CCB) Mobile® app gives you fast and secure
              access to your finances
            </p>
            <ul>
              <li>Check your account balance</li>
              <li>Transfer money between your accounts</li>
              <li>View your latest FICO® Score1</li>
              <li>Send and receive money with Zelle®2</li>
            </ul>
          </div>
          <div className="mobile__download">
            <button>Download the app</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mobile;
