import "./DashboardWrapper.css";
import { Link, useLocation } from "react-router-dom";
import DashboardNav from "../DashboardNav/DashboardNav";
import { HiLogout } from "react-icons/hi";
import { BsFillChatDotsFill, BsBoxArrowDown } from "react-icons/bs";
import { SiChatbot } from "react-icons/si";
import { logOut } from "../../features/auth/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Chat from "../Chat/Chat";

function DashboardWrapper({ children }) {
  const { pathname } = useLocation();
  const [showChat, setShowChat] = useState(false);

  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div>
        <DashboardNav
          toggle={toggle}
          setToggle={setToggle}
          showChat={showChat}
        />
      </div>
      <div className="dashboardDetails">
        <div className="dashboardDetails__container container">
          <div
            className={`dashboardDetails__left ${
              toggle && "showDashboard__left"
            } `}
          >
            <ul>
              <li className={`${pathname === "/dashboard" ? "active" : ""}`}>
                <Link to="/dashboard">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13,15 L13,15 C13,14.448 12.553,14 12,14 L8,14 L8,16 L12,16 C12.553,16 13,15.552 13,15 L13,15 Z M16,12 L16,12 C16,11.448 15.553,11 15,11 L8,11 L8,13 L15,13 C15.553,13 16,12.552 16,12 L16,12 Z M14,9 L14,9 C14,8.448 13.553,8 13,8 L8,8 L8,10 L13,10 C13.553,10 14,9.552 14,9 L14,9 Z M2,14 L4,14 L4,10 L2,10 L2,14 Z M6,9 L6,15 C6,15.552 5.553,16 5,16 L1,16 C0.447,16 0,15.552 0,15 L0,9 C0,8.448 0.447,8 1,8 L5,8 C5.553,8 6,8.448 6,9 L6,9 Z M2,4 L4,4 L4,2 L2,2 L2,4 Z M6,1 L6,5 C6,5.552 5.553,6 5,6 L1,6 C0.447,6 0,5.552 0,5 L0,1 C0,0.448 0.447,0 1,0 L5,0 C5.553,0 6,0.448 6,1 L6,1 Z M10,4 L14,4 L14,2 L10,2 L10,4 Z M16,1 L16,5 C16,5.552 15.553,6 15,6 L9,6 C8.447,6 8,5.552 8,5 L8,1 C8,0.448 8.447,0 9,0 L15,0 C15.553,0 16,0.448 16,1 L16,1 Z"></path>
                  </svg>
                  <span>My account</span>
                </Link>
              </li>
              <li className={`${pathname === "/transfer" ? "active" : ""}`}>
                <Link to="/transfer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2,11.0024 L2,13.0024 C2.001,13.5544 2.448,14.0014 3,14.0024 L3,14.0024 L13,14.0024 C13.552,14.0014 13.999,13.5544 14,13.0024 L14,13.0024 L14,11.0024 L16,11.0024 L16,13.0024 C15.999,14.6594 14.657,16.0014 13,16.0024 L13,16.0024 L3,16.0024 C1.343,16.0014 0.001,14.6594 4.08562073e-14,13.0024 L4.08562073e-14,13.0024 L4.08562073e-14,11.0024 L2,11.0024 Z M11.246,1.2945 C11.636,0.9035 12.27,0.9015 12.66,1.2915 L12.66,1.2915 L16.4,5.0095 L12.68,8.7085 C12.289,9.0985 11.655,9.0975 11.266,8.7055 C10.876,8.3135 10.878,7.6815 11.27,7.2915 L11.27,7.2915 L12.568,6.0025 L10.789,6.0025 C9.802,6.0045 9.002,6.8035 9,7.7915 L9,7.7915 L9,12.0025 L7,12.0025 L7,7.7915 C7.001,5.6985 8.696,4.0025 10.789,4.0025 L10.789,4.0025 L12.555,4.0025 L11.25,2.7085 C10.858,2.3195 10.856,1.6865 11.246,1.2945 Z"></path>
                  </svg>
                  <span>Transfer</span>
                </Link>
              </li>
              <li className={`${pathname === "/transactions" ? "active" : ""}`}>
                <Link to="/transactions">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M11.5 15H4.5C3.94772 15 3.49148 14.5462 3.5655 13.9989C4.33623 8.29973 11.6638 7.70027 12.4345 2.00107C12.5085 1.45377 12.0523 1 11.5 1H4.5C3.94772 1 3.49148 1.45377 3.5655 2.00107C4.33623 7.70027 11.6638 8.29973 12.4345 13.9989C12.5085 14.5462 12.0523 15 11.5 15Z"
                      stroke-width="2"
                      stroke-linejoin="round"
                      data-stroke=""
                    ></path>
                    <path
                      d="M8 11C7.42857 11.4 6 13 5.5 14H10.5C10 13 8.57143 11.4 8 11Z"
                      data-fill=""
                    ></path>
                  </svg>
                  <span>
                    Transaction <br className="br" /> history
                  </span>
                </Link>
              </li>
              <li className={`${pathname === "/contact" ? "active" : ""}`}>
                <Link to="/contact">
                  <BsFillChatDotsFill style={{ color: "black" }} />
                  <span>Contact</span>
                </Link>
              </li>
              <li>
                <div
                  onClick={() => dispatch(logOut())}
                  className="dashboad__logout"
                >
                  <HiLogout />
                  <span>Log out</span>
                </div>
              </li>
            </ul>
          </div>

          <div
            className={`dashboardDetails__right ${
              showChat && "dashbordIndex"
            } `}
          >
            <div className="show__cat">{showChat && <Chat />}</div>
            <div className="chatbot">
              {showChat ? (
                <div
                  onClick={() => setShowChat(false)}
                  className="chatbot__svg"
                >
                  <BsBoxArrowDown />
                </div>
              ) : (
                <div onClick={() => setShowChat(true)} className="chatbot__svg">
                  <SiChatbot />
                </div>
              )}
              {/* {showChat ? <BsBoxArrowDown /> : <SiChatbot />} */}
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardWrapper;
