import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../../components/spinner/Spinner";
import { getAllUsers, reset, restrict } from "../../features/auth/user";
import AdminWrapper from "../components/AdminWrapper";

function TransferManagent() {
  const dispatch = useDispatch();
  const { allUser, isLoading, isError, message } = useSelector(
    (state) => state.userInfo
  );
  const [id, setId] = useState();

  const [numberOfRestriction, setNumberOfRestriction] = useState(0);

  const getId = (id) => {
    setId(id);
  };

  const restrictUser = (e) => {
    e.preventDefault();

    const userData = { id, numberOfRestriction };

    dispatch(restrict(userData));

    toast.success("User Restricted Successfully");
  };

  const handleChange = (e) => {
    setNumberOfRestriction(e.target.value);
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getAllUsers());

    return () => {
      dispatch(reset());
    };
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <AdminWrapper>
      <div className="admin__content">
        <h1>Manage Transactions</h1>

        <div>
          <table>
            <thead>
              <tr>
                <td className="right">Select</td>
                {/* <td className="right">id</td> */}
                <td className="right">Name</td>
                <td className="right">Account Number</td>
                <td className="right">Account Balance</td>
              </tr>
            </thead>
            <tbody>
              {allUser.length > 0 &&
                allUser?.map((user) => (
                  <tr key={user?._id}>
                    <td>
                      <input
                        type="checkbox"
                        name=""
                        value={user?._id}
                        id="checkbox"
                        onClick={() => getId(user?._id)}
                      />
                    </td>
                    {/* <td className="right">{user?._id}</td> */}
                    <td className="right">{user?.name}</td>
                    <td className="right">{user?.account_number}</td>
                    <td className="right">{user?.balance}.00</td>
                  </tr>
                ))}
            </tbody>
          </table>

          <form onSubmit={restrictUser}>
            <div className="form__group">
              <input
                value={numberOfRestriction}
                onChange={handleChange}
                type="number"
                required
              />
              <label htmlFor="">Set Total Number of Request</label>
            </div>
            <div className="form__group btn">
              <button>RESTRICT SELECTED USER FUND TRANSFER</button>
            </div>
          </form>
        </div>
      </div>
    </AdminWrapper>
  );
}

export default TransferManagent;
