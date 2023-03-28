import "./DashboardNav.css";
import { Link } from "react-router-dom";
import PersonIcon from "../../assets/person_icon.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineMenu } from "react-icons/md";
import { HiX } from "react-icons/hi";
// import { upload } from "../../features/auth/upload";
import { getMe, updateProfilePicture } from "../../features/auth/user";
import { reset } from "../../features/auth/authSlice";
import CitadelLogo from "../../assets/citadel.jpg";

function DashboardNav({ toggle, setToggle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo, isError, message } = useSelector((state) => state.userInfo);

  const { user } = useSelector((state) => state.auth);

  // const [file, setFile] = useState(null);

  // const userInfo = {
  //   profilePicture: null,
  // };

  // useEffect(() => {
  //   const handleImage = async () => {
  //     if (file) {
  //       const profilePicture = await upload(file);

  //       const userData = {
  //         id: userInfo?._id,
  //         profilePicture,
  //       };

  //       dispatch(updateProfilePicture(userData));

  //       setFile(null);
  //     }
  //   };

  //   handleImage();
  // }, [file, dispatch]);

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
                  src={
                    userInfo?.profilePicture
                      ? userInfo?.profilePicture
                      : PersonIcon
                  }
                  style={{ cursor: "pointer" }}
                  alt=""
                />
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar__mobile">
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
                  <img
                    src={
                      userInfo?.profilePicture
                        ? userInfo?.profilePicture
                        : PersonIcon
                    }
                    style={{ cursor: "pointer" }}
                    alt=""
                  />
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
