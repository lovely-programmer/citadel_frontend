import React from "react";
import AdminWrapper from "../components/AdminWrapper";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { editUser, getAllUsers, reset } from "../../features/auth/user";
import Spinner from "../../components/spinner/Spinner";
import {
  createTransaction,
  Edit,
  sendUpdateUser,
} from "../../features/auth/transactionSlice";

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
      // date: new Date().toLocaleDateString("en-US"),
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
    } else if (formData.action === "debit") {
      dispatch(
        sendUpdateUser({
          subject: "Debit Alert",
          amount: formData.update_balance,
          recipient_email: formData.email,
          account_name: formData.name,
          account_number: formData.account_number,
          alert: "Credit",
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
                value={formData.account_type}
                name="account_type"
              >
                <option value={formData.account_type}>
                  {formData.account_type}
                </option>
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
            <div className="form__group">
              <input
                type="number"
                required
                id="balance"
                name="balance"
                value={formData.balance}
              />
              <label htmlFor="balance">Account Balance</label>
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
