import { useState, useEffect } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { AiOutlineRight } from "react-icons/ai";
import { HiX } from "react-icons/hi";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  login,
  LoginMail,
  reset,
  sendMail,
} from "../../features/auth/authSlice";
import Spinner from "../spinner/Spinner";
import { toast } from "react-toastify";
import CitadelLogo from "../../assets/citadel.jpg";

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { username, password };
    dispatch(login(userData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/dashboard");
    }

    if (isSuccess) {
      dispatch(
        LoginMail({
          name: user?.name,
          recipient_email: user?.email,
          subject: "Login Successfully",
        })
      );
    }

    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__top container">
          <div className="navbar__top-left">
            <ul>
              <li className="active">
                <Link to="">Personal</Link>
              </li>
              <li>
                <Link to="">Small Business</Link>
              </li>
              <li>
                <Link to="">Wealth</Link>
              </li>
              <li>
                <Link to="">Commercial</Link>
              </li>
              <li>
                <Link to="">Corperate & Institutional</Link>
              </li>
            </ul>
          </div>
          <div className="navbar__top-right">
            <ul>
              <li>
                <input type="text" placeholder="How can i help you" />
                <button>Search</button>
              </li>
              <li>
                <Link to="">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar__bottom">
          <div className="container">
            <div className="navbar__bottom-left">
              <div className="nav__logo">
                <Link to="/">
                  <img src={CitadelLogo} alt="" />
                </Link>
              </div>
            </div>
            <div className="navbar__bottom-center">
              <ul>
                <li>
                  <Link to="">Checking & Savings</Link>
                </li>
                <li>
                  <Link to="">Credit cards</Link>
                </li>
                <li>
                  <Link to="">Investing</Link>
                </li>
              </ul>
            </div>
            <div className="navbar__bottom-right">
              <div className="open">
                <Link to="/signup">Open account</Link>
              </div>
              <div className="signin">
                {showLogin ? (
                  <button onClick={() => setShowLogin(false)}>
                    <AiOutlineRight />
                  </button>
                ) : (
                  <button onClick={() => setShowLogin(true)}>Sign in</button>
                )}

                {showLogin && (
                  <div className="navbar__login">
                    <div className="navbar__login-container">
                      <h3>Online Banking Sign-in</h3>
                      <form onSubmit={handleSubmit}>
                        <div className="form__group">
                          <input
                            onChange={handleChange}
                            value={username}
                            name="username"
                            type="text"
                            required
                            id="username"
                          />
                          <label htmlFor="username">Username</label>
                        </div>
                        <div className="remember__username">
                          <input type="checkbox" id="" />
                          <span>Remember my username</span>
                        </div>
                        <div className="form__group">
                          <input
                            onChange={handleChange}
                            value={password}
                            name="password"
                            type="password"
                            required
                            id="password"
                          />
                          <label htmlFor="password">Password</label>
                        </div>
                        <div className="form__button">
                          <button>Log in</button>
                        </div>
                        <div className="create__account-link">
                          <p>
                            <Link to="/signup">
                              Create a username and Password
                            </Link>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
              <div className="menu">
                {toggle ? (
                  <HiX onClick={() => setToggle(false)} />
                ) : (
                  <MdOutlineMenu onClick={() => setToggle(true)} />
                )}
              </div>

              {toggle && (
                <div className="toggle__menu">
                  <div className="toggle__container">
                    <ul>
                      <li className="search__input">
                        <input type="text" placeholder="How can i help you" />
                        <button>Search</button>
                      </li>
                      <li className="toggle__list">Personal</li>
                      <li className="toggle__list">Checking & Saving</li>
                      <li className="toggle__list">Credit Cards</li>
                      <li className="toggle__list">Loans</li>
                      <li className="toggle__list">Mortgage</li>
                      <li className="toggle__list">Investment & Retirement</li>
                      <li className="toggle__list">Insurance</li>
                      <li className="toggle__list">Money and Mindset</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
