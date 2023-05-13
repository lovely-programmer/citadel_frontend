import React from "react";
import AdminWrapper from "../components/AdminWrapper";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../../components/spinner/Spinner";
import axios from "axios";
import { editUser } from "../../features/auth/user";

function EditUserData() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  // const MY_API = "http://localhost:5000/api/";

  const MY_API = "https://plain-dirndl-pike.cyclic.app/api/";

  const [user, setUser] = useState(null);

  const { pathname } = useLocation();

  const id = pathname.split("/")[3];

  const [formData, setFormData] = useState();

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(MY_API + "users/getOne/?userId=" + id);
        setUser(res.data);
        setFormData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [id]);

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
      email: formData.email,
      account_type: formData.account_type,
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
          <h1>Edit Customer Data</h1>

          <form onSubmit={handleSubmit} className="authDetails__form">
            <div className="form__group">
              <input
                required
                type="text"
                id="fullName"
                name="name"
                value={formData?.name}
                onChange={handleChange}
              />
              <label htmlFor="fullName">Full Name</label>
            </div>

            <div className="form__group">
              <input
                required
                type="text"
                id="email"
                name="email"
                value={formData?.email}
                onChange={handleChange}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="form__group">
              <select
                onChange={handleChange}
                value={formData?.account_type}
                name="account_type"
              >
                <option value="Savings">Savings</option>
                <option value="Current">Current</option>
                <option value="Investment">Investment</option>
              </select>
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

export default EditUserData;
