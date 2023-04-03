import "./DashboardNav.css";
import { Link } from "react-router-dom";
import PersonIcon from "../../assets/person_icon.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineMenu } from "react-icons/md";
import { HiX } from "react-icons/hi";
import { getMe, updateProfilePicture } from "../../features/auth/user";
import { reset } from "../../features/auth/authSlice";
import CitadelLogo from "../../assets/citadel.jpg";
import { convertToBase64 } from "../../features/auth/upload";

function DashboardNav({ toggle, setToggle, showChat }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo, isError, message } = useSelector((state) => state.userInfo);

  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    setProfilePicture(userInfo?.profilePicture);
  }, [userInfo]);

  const { user } = useSelector((state) => state.auth);

  const [file, setFile] = useState(null);

  useEffect(() => {
    const handleImage = async () => {
      if (file) {
        const base64 = await convertToBase64(file);

        const userData = {
          id: userInfo?._id,
          profilePicture: base64,
        };

        dispatch(updateProfilePicture(userData));

        setProfilePicture(base64);

        setFile(null);
      }
    };

    handleImage();
  }, [file, dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getMe());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <div className="dashboardNav">
      <div className="dashboardNav__container container">
        <div className="authNav__logo">
          <Link to="/dashboard">
            <img src={CitadelLogo} alt="" />
          </Link>
        </div>
        <div className="dashboardNav__content">
          <ul>
            <li>
              <div className="dashboard__profile">
                <img
                  src={profilePicture ? profilePicture : PersonIcon}
                  style={{ cursor: "pointer" }}
                  alt=""
                />
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className={`navbar__mobile ${showChat && "navbar__mobile-index"}`}>
        <div className="navbar__mobile-content">
          <div className="navbar__mobile-container container">
            <ul>
              <li>
                {toggle ? (
                  <HiX onClick={() => setToggle(false)} />
                ) : (
                  <MdOutlineMenu onClick={() => setToggle(true)} />
                )}
              </li>
              <li className="nav__logo">
                <Link to="/dashboard">
                  <img src={CitadelLogo} alt="" />
                </Link>
              </li>
              <li>
                <div className="dashboard__profile">
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="profile_picture"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <label htmlFor="profile_picture">
                    <img
                      src={profilePicture ? profilePicture : PersonIcon}
                      style={{ cursor: "pointer" }}
                      alt=""
                    />
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardNav;
