import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, loginAdmin, reset } from "../../features/auth/authSlice";
import Spinner from "../../components/spinner/Spinner";
import Navbar from "../components/Navbar";

function AdminLogin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { adminUser, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && adminUser.isAdmin) {
      navigate("/admin/newcustomer");
    }

    dispatch(reset());
  }, [adminUser, isSuccess, isError, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { username, password };

    dispatch(loginAdmin(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="authDetails">
        <div className="authDetails__container">
          <div className="authDetails__content">
            <h2>Get started.</h2>
          </div>
          <form onSubmit={handleSubmit} className="authDetails__form">
            <div className="form__group">
              <input
                type="text"
                required
                id="username"
                name="username"
                value={username}
                onChange={handleChange}
              />
              <label htmlFor="fullName">Username</label>
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

            <div className="form__group btn">
              <button className="admin__login-btn">Login Account</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
