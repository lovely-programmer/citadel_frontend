import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  updateBalance,
  createTransaction,
} from "../../features/auth/transactionSlice";
import { getMe, reset, updateCot } from "../../features/auth/user";
import Spinner from "../spinner/Spinner";
import { toast } from "react-toastify";

function COT() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cotCode, setCotCode] = useState();
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
    if (userInfo?.cot_code !== cotCode) {
      toast.error("Invalid COT Code");
    } else if (
      userInfo?.cot_code === cotCode &&
      userInfo?.atc_code_need === true
    ) {
      dispatch(updateCot(userId));
      navigate("/request/atc");
    } else if (userInfo?.cot_code === cotCode) {
      dispatch(updateCot(userId));
      dispatch(updateBalance(userData));
      dispatch(createTransaction(trans));
      toast.success("Transaction Successful");
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
          <p>Enter COT code to Continue Transaction Process</p>
          <p>
            I don't have my COT Code. Contact First Trust Customer Care via
            email: <Link to="/contact">contact@citadelchoicebank.com</Link>
          </p>
        </div>
        <div className="code__body">
          <form onSubmit={handleSubmit}>
            <div className="form__group">
              <input
                onChange={(e) => setCotCode(e.target.value)}
                type="text"
                required
              />
              <label htmlFor="">Input COT code</label>
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
            COT Request is in accordance to the Constitutional Laws of the
            United States governing the transfer of funds to or from a foreign
            account
          </p>
        </div>
      </div>
    </div>
  );
}

export default COT;
