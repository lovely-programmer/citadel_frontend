import "./Account.css";
import Spinner from "../spinner/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { getMe, reset } from "../../features/auth/user";
import { useEffect } from "react";

function Account() {
  const dispatch = useDispatch();

  const { userInfo, isLoading, isError, message } = useSelector(
    (state) => state.userInfo
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getMe());
    return () => {
      dispatch(reset());
    };
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="account">
      <div className="account__container">
        <h2>My Account</h2>
        <div className="account__details">
          <table>
            <tbody>
              <tr>
                <td className="left">Account Number:</td>
                <td className="right">{userInfo?.account_number}</td>
              </tr>
              <tr>
                <td className="left">Routing Number:</td>
                <td className="right">{userInfo?.routing_number}</td>
              </tr>
              <tr>
                <td className="left">Account Holder:</td>
                <td className="right">{userInfo?.name}</td>
              </tr>
              <tr>
                <td className="left">Account Type:</td>
                <td className="right">{userInfo?.account_type}</td>
              </tr>
              <tr>
                <td className="left">Currency:</td>
                <td className="right">USD</td>
              </tr>
              <tr>
                <td className="left">Current Balance:</td>
                <td className="right">{`${userInfo?.balance}.00`}</td>
              </tr>
              <tr>
                <td className="left">Available Balance:</td>
                <td className="right">{`${userInfo?.balance}.00`}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Account;
