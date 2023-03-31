import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  updateBalance,
  createTransaction,
} from "../../features/auth/transactionSlice";
import { getMe, reset, updateImf } from "../../features/auth/user";
import Spinner from "../spinner/Spinner";
import { toast } from "react-toastify";

function IMF() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imfCode, setImfCode] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [onGoingTransaction, setOngoingTransaction] = useState();

  const { userInfo, isError, message } = useSelector((state) => state.userInfo);

  useEffect(() => {
    setOngoingTransaction(JSON.parse(localStorage.getItem("transferData")));
  }, []);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getMe());

    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const trans = {
    amount: onGoingTransaction?.amount,
    remark: onGoingTransaction?.remark,
    transaction_type: "Debit",
    name: userInfo?.name,
    date: new Date().toLocaleDateString("en-US"),
  };

  const userId = {
    id: userInfo?._id,
  };

  const userData = {
    amount: onGoingTransaction?.amount,
    id: userInfo?._id,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInfo?.imf_code !== imfCode) {
      toast.error("Invalid IMF Code");
    } else if (
      userInfo?.imf_code === imfCode &&
      userInfo?.cot_code_need === true
    ) {
      dispatch(updateImf(userId));
      navigate("/request/cot");
    } else if (userInfo?.imf_code === imfCode) {
      dispatch(updateImf(userId));
      dispatch(updateBalance(userData));
      dispatch(createTransaction(trans));
      toast.success("Transaction Successfully");
      setTimeout(() => {
        navigate("/transactions");
      }, 1000);
      clearTimeout(timer);
      localStorage.removeItem("transferData");
      setOngoingTransaction(null);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="code">
      <div className="code__container">
        <div className="code__header">
          <h2>IMF CODE REQUEST:</h2>
          <p>Enter IMF code to Continue Transaction Process</p>
          <p>
            I don't have my IMF Code. Contact First Trust Customer Care via
            email: <Link to="/contact">contact@citadelchoicebank.com</Link>
          </p>
        </div>
        <div className="code__body">
          <form onSubmit={handleSubmit}>
            <div className="form__group">
              <input
                onChange={(e) => setImfCode(e.target.value)}
                type="text"
                required
              />
              <label htmlFor="">Input IMF code</label>
            </div>

            <div className="form__group cont">
              <button style={{ backgroundColor: "#0a2d7e" }}>CONTINUE</button>
            </div>
          </form>

          <div className="form__group goBack">
            <Link to="/transfer">
              <button className="red_btn">GO BACK TO FUNDS TRASFER PAGE</button>
            </Link>
          </div>

          <p className="code__footer">
            IMF Request is in accordance to the Constitutional Laws of the
            United States governing the transfer of funds to or from a foreign
            account
          </p>
        </div>
      </div>
    </div>
  );
}

export default IMF;
