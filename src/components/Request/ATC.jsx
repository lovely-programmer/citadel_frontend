import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  updateBalance,
  createTransaction,
  sendTransactionMail,
} from "../../features/auth/transactionSlice";
import { getMe, reset, updateAtc } from "../../features/auth/user";
import Spinner from "../spinner/Spinner";
import { toast } from "react-toastify";

function ATC() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [atcCode, setAtcCode] = useState();
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
    id: userInfo?._id,
    amount: amount,
    remark: remark,
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
    if (userInfo?.atc_code !== atcCode) {
      toast.error("Invalid ATC Code");
    } else if (userInfo?.atc_code === atcCode) {
      dispatch(updateAtc(userId));
      dispatch(updateBalance(userData));
      dispatch(createTransaction(trans));
      dispatch(
        sendTransactionMail({
          account_name: onGoingTransaction?.name,
          amount: onGoingTransaction?.amount,
          account_number: parseInt(onGoingTransaction?.account_number),
          account_balance:
            userInfo?.balance - parseInt(onGoingTransaction?.amount),
          recipient_email: onGoingTransaction?.email,
        })
      );
      toast.success("Transaction Successful");
      setTimeout(() => {
        navigate("/transactions");
      }, 1000);
      localStorage.removeItem("transferData");
      setOngoingTransaction(null);
    }
  };

  console.log(
    userInfo?.balance - parseInt(onGoingTransaction?.amount),
    parseInt(onGoingTransaction?.account_number),
    onGoingTransaction?.email,
    onGoingTransaction?.amount
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="code">
      <div className="code__container">
        <div className="code__header">
          <p>Enter ATC code to Continue Transaction Process</p>
          <p>
            I don't have my ATC Code. Contact Citadel Choice Bank Customer Care
            via email: <Link to="/contact">contact@citadelchoicebank.com</Link>
          </p>
        </div>
        <div className="code__body">
          <form onSubmit={handleSubmit}>
            <div className="form__group">
              <input
                onChange={(e) => setAtcCode(e.target.value)}
                type="text"
                required
              />
              <label htmlFor="">Input ATC code</label>
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
            ATC Request is in accordance to the Constitutional Laws of the
            United States governing the transfer of funds to or from a foreign
            account
          </p>
        </div>
      </div>
    </div>
  );
}

export default ATC;
