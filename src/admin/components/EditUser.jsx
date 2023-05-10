import React from "react";
import AdminWrapper from "../components/AdminWrapper";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../../components/spinner/Spinner";
import { toast } from "react-toastify";
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

  const [isSuccess, setIsSuccess] = useState(false);

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
      name: formData.sender_name,
      date: formData.date,
    };

    if (formData.action === "credit") {
      dispatch(Edit(userData));

      dispatch(createTransaction(transactionDetails));

      dispatch(
        sendUpdateUser({
          subject: "Credit Alert",
          amount: formData.update_balance,
          recipient_email: formData.email,
          account_name: formData.name,
          sender_name: formData.sender_name,
          alert: "Credit",
          remark: formData.remark,
          date: formData.date,
          account_balance:
            parseInt(formData.balance) + parseInt(formData.update_balance),
        })
      );

      toast.success("Account Credited Successfully");

      formData.sender_name = "";
      formData.remark = "";
      formData.date = "";
      formData.update_balance = "";
    } else if (formData.action === "debit") {
      dispatch(Edit(userData));

      dispatch(createTransaction(transactionDetails));

      dispatch(
        sendUpdateUser({
          subject: "Debit Alert",
          amount: formData.update_balance,
          recipient_email: formData.email,
          account_name: formData.name,
          sender_name: formData.sender_name,
          alert: "Debit",
          remark: formData.remark,
          date: formData.date,
          account_balance:
            parseInt(formData.balance) - parseInt(formData.update_balance),
        })
      );

      toast.success("Account Debited Successfully");

      formData.sender_name = "";
      formData.remark = "";
      formData.date = "";
      formData.update_balance = "";
    }
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
              <label htmlFor="">Full Name</label>
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
                type="text"
                required
                id="sender_name"
                name="sender_name"
                onChange={handleChange}
              />
              <label htmlFor="sender_name">Sender Name</label>
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
