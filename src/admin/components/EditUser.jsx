import React from "react";
import AdminWrapper from "../components/AdminWrapper";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../../components/spinner/Spinner";
import {
  createTransaction,
  Edit,
  sendUpdateUser,
} from "../../features/auth/transactionSlice";
import axios from "axios";

function EditUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState();

  const { pathname } = useLocation();

  // const MY_API = "http://localhost:5000/api/";

  const MY_API = "https://citadel-backend.onrender.com/api/";

  const id = pathname.split("/")[3];

  const [user, setUser] = useState(null);

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
      initial_balance: formData.balance,
      action: formData.action,
      editedBalance: formData.update_balance,
    };

    const transactionDetails = {
      id,
      amount: formData.update_balance,
      remark: formData.remark,
      transaction_type: formData.action,
      name: formData.name,
      date: formData.date,
    };

    dispatch(Edit(userData));

    dispatch(createTransaction(transactionDetails));

    if (formData.action === "credit") {
      dispatch(
        sendUpdateUser({
          subject: "Credit Alert",
          amount: formData.update_balance,
          recipient_email: formData.email,
          account_name: formData.name,
          account_number: formData.account_number,
          alert: "Credit",
          remark: formData.remark,
          date: formData.date,
          account_balance:
            parseInt(formData.balance) + parseInt(formData.update_balance),
        })
      );
    }
    if (formData.action === "debit") {
      dispatch(
        sendUpdateUser({
          subject: "Debit Alert",
          amount: formData.update_balance,
          recipient_email: formData.email,
          account_name: formData.name,
          account_number: formData.account_number,
          alert: "Debit",
          remark: formData.remark,
          date: formData.date,
          account_balance:
            parseInt(formData.balance) - parseInt(formData.update_balance),
        })
      );
    }

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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "10px",
              }}
            >
              <label htmlFor="fullName">Full Name</label>
              <input
                style={{
                  width: "80%",
                  padding: "10px",
                  outline: "none",
                  border: "1px solid lightgray",
                  marginTop: "10px",
                }}
                required
                type="text"
                id="name"
                name="name"
                value={formData?.name}
                readOnly
              />
            </div>

            <div className="form__group">
              <select
                readOnly
                value={formData?.account_type}
                name="account_type"
              >
                <option value="Savings">Savings</option>
                <option value="Current">Current</option>
                <option value="Investment">Investment</option>
              </select>
            </div>
            <div className="form__group">
              <select onChange={handleChange} name="action" required>
                <option value="">Select Action </option>
                <option value="debit">debit</option>
                <option value="credit">credit</option>
              </select>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "10px",
              }}
            >
              <label htmlFor="balance">Account Balance</label>
              <input
                style={{
                  width: "80%",
                  padding: "10px",
                  outline: "none",
                  border: "1px solid lightgray",
                  marginTop: "10px",
                }}
                type="number"
                required
                id="balance"
                name="balance"
                readOnly
                value={formData?.balance}
              />
            </div>

            <div className="form__group">
              <input
                type="number"
                required
                id="update_balance"
                name="update_balance"
                onChange={handleChange}
              />
              <label htmlFor="update_balance">Edit balance</label>
            </div>

            <div className="form__group">
              <input
                type="text"
                required
                id="remark"
                name="remark"
                onChange={handleChange}
              />
              <label htmlFor="remark">Remark</label>
            </div>

            <div className="form__group">
              <input
                required
                onChange={handleChange}
                name="date"
                type="date"
                id=""
              />
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
