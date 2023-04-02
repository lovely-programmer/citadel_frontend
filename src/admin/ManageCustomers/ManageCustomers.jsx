import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminWrapper from "../components/AdminWrapper";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, deleteOffice, reset } from "../../features/auth/user";
import Spinner from "../../components/spinner/Spinner";

function ManageCustomers() {
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(false);

  const { allUser, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.userInfo
  );

  const handleDelete = (id) => {
    dispatch(deleteOffice(id));
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess) {
      setDeleted(true);
    }

    dispatch(getAllUsers());

    return () => {
      dispatch(reset());
    };
  }, [deleted, dispatch, isError]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <AdminWrapper>
      <div className="admin__content">
        <h1>Manage Customers</h1>

        <div>
          <table>
            <thead>
              <tr>
                <td className="right">Name</td>
                <td className="right">Account Number</td>
                <td className="right">Account Type</td>
                <td className="right">Account Balance</td>
                <td className="right">Edit</td>
                <td className="right">EditData</td>
                <td className="right">Delete</td>
              </tr>
            </thead>
            <tbody>
              {allUser.length > 0 &&
                allUser?.map((user) => (
                  <tr key={user?._id}>
                    <td className="right">{user?.username}</td>
                    <td className="right">{user?.account_number}</td>
                    <td className="right">{user?.account_type}</td>
                    <td className="right">{user?.balance}.00</td>

                    <td className="right">
                      <Link to={`/admin/edituser/${user?._id}`}>
                        <button style={{ backgroundColor: "#5CB85C" }}>
                          Edit
                        </button>
                      </Link>
                    </td>

                    <td className="right">
                      <Link to={`/admin/edituserdata/${user?._id}`}>
                        <button style={{ backgroundColor: "#5CB85C" }}>
                          EditData
                        </button>
                      </Link>
                    </td>

                    <td className="right">
                      <button onClick={() => handleDelete(user?._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminWrapper>
  );
}

export default ManageCustomers;
