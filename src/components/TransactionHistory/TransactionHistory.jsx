import "./TransactionHistory.css";
import { useDispatch, useSelector } from "react-redux";
import { getTransaction, reset } from "../../features/auth/transactionSlice";
import { useEffect } from "react";
import Spinner from "../spinner/Spinner";
import { getMe } from "../../features/auth/user";

function TransactionHistory() {
  const dispatch = useDispatch();

  const { transaction, isError, isLoading, message } = useSelector(
    (state) => state.transactionsInfo
  );

  const { userInfo } = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (userInfo._id) {
      dispatch(getTransaction(userInfo._id));
    }

    return () => {
      dispatch(reset());
    };
  }, [userInfo._id]);

  useEffect(() => {
    dispatch(getMe());
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="transactionHistory admin__content">
      <div className="transactionHistory__container">
        <h1>Transactions History</h1>
        <div className="transactionHistory__table">
          <table>
            <thead>
              <tr>
                <td>Date</td>
                <td>Type</td>
                <td>Amount</td>
                <td>To/From</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              {transaction.length > 0 &&
                transaction.map((trans) => (
                  <tr key={trans?._id}>
                    <td> {trans?.date} </td>
                    <td>{trans?.transaction_type}</td>
                    <td>{trans?.amount}</td>
                    <td>{trans?.name}</td>
                    <td>{trans?.remark}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          {!transaction.length && (
            <div style={{ marginTop: "20px" }}>
              <h2>No Transaction</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory;
