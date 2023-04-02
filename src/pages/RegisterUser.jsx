import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset, sendMail } from "../features/auth/authSlice";
import Spinner from "../components/spinner/Spinner";

function RegisterUser() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    address: "",
    account_type: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const {
    username,
    name,
    email,
    address,
    account_type,
    phoneNumber,
    password,
    confirmPassword,
  } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/dashboard");
    }

    if (isSuccess) {
      dispatch(
        sendMail({
          recipient_email: email,
          recipient_name: name,
          recipient_username: username,
        })
      );
    }

    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      const userData = {
        username,
        name,
        email,
        password,
        address,
        phoneNumber,
        account_type,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="register">
      <div className="register__container">
        <div className="register__nav">
          <Link to="/">
            <h2>Citadel Choice Bank</h2>
          </Link>
        </div>
        <div className="register__form">
          <form onSubmit={handleSubmit}>
            <div className="form__group">
              <input
                required
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleChange}
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="form__group">
              <input
                required
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
              />
              <label htmlFor="name">Full Name</label>
            </div>
            <div className="form__group">
              <input
                value={email}
                onChange={handleChange}
                required
                id="email"
                name="email"
                type="text"
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form__group">
              <input
                value={address}
                onChange={handleChange}
                required
                id="address"
                name="address"
                type="text"
              />
              <label htmlFor="address">Address</label>
            </div>
            <div className="form__group">
              <input
                value={phoneNumber}
                onChange={handleChange}
                required
                id="phoneNumber"
                name="phoneNumber"
                type="text"
              />
              <label htmlFor="phoneNumber">Phone Number</label>
            </div>
            <div className="form__group">
              <select
                onChange={handleChange}
                value={account_type}
                name="account_type"
              >
                <option value="">Select Account</option>
                <option value="Savings">Savings</option>
                <option value="Checking">Checking</option>
                <option value="Investment">Investment</option>
              </select>
            </div>
            <div className="form__group">
              <input
                value={password}
                onChange={handleChange}
                required
                id="password"
                name="password"
                type="password"
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="form__group">
              <input
                value={confirmPassword}
                onChange={handleChange}
                required
                id="confirmPassword"
                name="confirmPassword"
                type="password"
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>
            <div className="create__account-btn">
              <button>Create Account</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
