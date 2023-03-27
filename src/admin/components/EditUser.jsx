import React from "react";
import AdminWrapper from "../components/AdminWrapper";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { editUser, getAllUsers, reset } from "../../features/auth/user";
import Spinner from "../../components/spinner/Spinner";

function EditUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const id = pathname.split("/")[3];

  const { allUser, isLoading, isError, message } = useSelector(
    (state) => state.userInfo
  );

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getAllUsers());

    const user = allUser.filter((user) => user._id === id);

    user.forEach((u) => {
      setFormData(u);
    });

    return () => {
      dispatch(reset());
    };
  }, []);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      id: id,
      name: formData.name,
      account_type: formData.account_type,
      balance: formData.balance,
    };

    dispatch(editUser(userData));

    navigate("/admin/managecustomers");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <AdminWrapper>
        <div className="admin__content">
          <h1>Edit Customer</h1>

          <form onSubmit={handleSubmit} className="authDetails__form">
            <div className="form__group">
              <input
                required
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <label htmlFor="fullName">Full Name</label>
            </div>

            <div className="form__group">
              <select
                onChange={handleChange}
                value=""
                name="account_type"
                id=""
              >
                <option value={formData.account_type}>
                  {formData.account_type}
                </option>
                <option value="Savings">Savings</option>
                <option value="Current">Current</option>
              </select>
            </div>
            <div className="form__group">
              <input
                type="number"
                required
                id="balance"
                name="balance"
                value={formData.balance}
                onChange={handleChange}
              />
              <label htmlFor="fullName">Account Balance</label>
            </div>

            <div className="form__group btn">
              <button>Update Account</button>
            </div>
          </form>
        </div>
      </AdminWrapper>
    </div>
  );
}

export default EditUser;
