import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createTransaction,
  sendTransactionMail,
  updateBalance,
} from "../../features/auth/transactionSlice";
import { getMe, reset } from "../../features/auth/user";
import "./Transfer.css";

function Transfer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [onGoingTransaction, setOngoingTransaction] = useState(null);

  const [amount, setAmount] = useState();
  const [remark, setRemark] = useState();
  const [accountNumber, setAccountNumber] = useState();
  const [accountName, setAccountName] = useState();
  const [bankName, setBankName] = useState();
  const [routingTransit, setRouterTransit] = useState();
  const [ifsc, setIfsc] = useState();
  const [accountType, setAccountType] = useState();

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
  }, [isError, dispatch]);

  const transferDetails = {
    amount,
    remark,
    transaction_type: "Debit",
    name: userInfo?.name,
    email: userInfo?.email,
    account_number: accountNumber,
  };

  const trans = {
    id: userInfo?._id,
    amount,
    remark,
    transaction_type: "Debit",
    name: userInfo?.name,
    date: new Date().toLocaleDateString("en-US"),
  };

  const userData = {
    amount,
    id: userInfo?._id,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("transferData", JSON.stringify(transferDetails));
    if (userInfo?.balance - amount < 0) {
      toast.error("Transaction Failed not enough funds");
    } else if (userInfo?.tcc_code_need === true) {
      navigate("/request/tcc");
    } else if (userInfo?.imf_code_need === true) {
      navigate("/request/imf");
    } else if (userInfo?.cot_code_need === true) {
      navigate("/request/cot");
    } else if (userInfo?.atc_code_need === true) {
      navigate("/request/atc");
    } else {
      if (userInfo?.balance - amount < 0) {
        toast.error("Transaction Failed not enough funds");
      } else {
        dispatch(updateBalance(userData));
        dispatch(createTransaction(trans));
        dispatch(
          sendTransactionMail({
            account_name: userInfo?.name,
            amount,
            account_number: parseInt(accountNumber),
            account_balance: userInfo?.balance - amount,
            recipient_email: userInfo?.email,
          })
        );
        toast.success("Transaction Successfully");
        setTimeout(() => {
          navigate("/transactions");
        }, 1000);
        localStorage.removeItem("transferData");
      }
    }
  };

  const cancelTransaction = () => {
    localStorage.removeItem("transferData");
    setOngoingTransaction(null);
  };

  return (
    <div className="transfer">
      <div className="transfer__container">
        <h1>Funds Transfer</h1>

        {onGoingTransaction ? (
          <div className="cont__transaction">
            <div onClick={handleSubmit} className="form__group purple__btn">
              <button>Continue Pending Transaction</button>
            </div>
            <div className="form__group red__btn">
              <button onClick={cancelTransaction}>Cancel Transaction</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form__group">
              <input
                onChange={(e) => setAccountNumber(e.target.value)}
                required
                type="number"
                value={accountNumber}
              />
              <label>Account Number</label>
            </div>
            <div className="form__group">
              <input
                onChange={(e) => setAccountName(e.target.value)}
                required
                type="text"
                value={accountName}
              />
              <label>Account Name</label>
            </div>
            <div className="form__group">
              <input
                onChange={(e) => setBankName(e.target.value)}
                required
                type="text"
                value={bankName}
              />
              <label>Bank Name</label>
            </div>
            <div className="form__group">
              <input
                onChange={(e) => setRouterTransit(e.target.value)}
                required
                type="text"
                value={routingTransit}
              />
              <label>Routing Transit Number(RTN)/IBAN</label>
            </div>
            <div className="form__group">
              <input
                onChange={(e) => setIfsc(e.target.value)}
                required
                type="text"
                value={ifsc}
              />
              <label>IFSC/SWIFT CODE</label>
            </div>
            <div className="form__group">
              <input
                onChange={(e) => setAmount(e.target.value)}
                required
                type="number"
                value={amount}
              />
              <label>Amount</label>
            </div>
            <div className="form__group">
              <input
                onChange={(e) => setRemark(e.target.value)}
                required
                type="text"
                value={remark}
              />
              <label>Remarks</label>
            </div>
            <div className="form__group">
              <select
                onChange={(e) => setAccountType(e.target.value)}
                value={accountType}
                name=""
                id=""
                required
              >
                <option value="">Account Type</option>
                <option value="Savings">Savings</option>
                <option value="Checking">Checking</option>
              </select>
            </div>
            <div className="form__group btn">
              <button>Verify & Transfer</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Transfer;
