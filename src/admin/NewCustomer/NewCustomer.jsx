import React from "react";
import AdminWrapper from "../components/AdminWrapper";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset, sendMail } from "../../features/auth/authSlice";
import { useState, useEffect } from "react";
import { convertToBase64 } from "../../features/auth/upload";
import Spinner from "../../components/spinner/Spinner";

function NewCustomer() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    address: "",
    account_type: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    balance: "",
  });

  const {
    username,
    name,
    email,
    address,
    account_type,
    balance,
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

    if (isSuccess) {
      dispatch(
        sendMail({
          recipient_email: email,
          message: "You have Successfully Created Your account",
          subject: `"Welcome ${username}`,
        })
      );

      navigate("/admin/managecustomers");
    }

    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setProfilePicture(base64);
  };

  const handleSubmit = async (e) => {
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
        profilePicture,
        account_type,
        balance,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <AdminWrapper>
        <div className="admin__content">
          <h1>New Customer</h1>

          <form onSubmit={handleSubmit} className="authDetails__form">
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
                type="text"
                required
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
              <label htmlFor="fullName">Email Address</label>
            </div>
            <div className="form__group">
              <input
                type="text"
                required
                id="address"
                name="address"
                value={address}
                onChange={handleChange}
              />
              <label htmlFor="fullName">Address</label>
            </div>
            <div className="form__group">
              <input
                type="text"
                required
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleChange}
              />
              <label htmlFor="fullName">Phone Number</label>
            </div>
            <div className="form__group">
              <input
                type="file"
                required
                id="profilePicture"
                name="profilePicture"
                onChange={handleFileUpload}
              />
            </div>
            <div className="form__group">
              <select
                required
                onChange={handleChange}
                value={account_type}
                name="account_type"
                id=""
              >
                <option value="">Account Type</option>
                <option value="Savings">Savings</option>
                <option value="Checking">Checking</option>
                <option value="Investment">Investment</option>
              </select>
            </div>
            <div className="form__group">
              <input
                type="number"
                required
                id="balance"
                name="balance"
                value={balance}
                onChange={handleChange}
              />
              <label htmlFor="fullName">Account Balance</label>
            </div>
            <div className="form__group">
              <input
                type="password"
                required
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
              <label htmlFor="fullName">Password</label>
            </div>
            <div className="form__group">
              <input
                type="password"
                required
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
              />
              <label htmlFor="fullName">Confirm Password</label>
            </div>

            <div className="form__group btn">
              <button>Create Account</button>
            </div>
          </form>
        </div>
      </AdminWrapper>
    </div>
  );
}

export default NewCustomer;
