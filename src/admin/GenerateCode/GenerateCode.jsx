import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../../components/spinner/Spinner";
import { getAllUsers, reset, getCode } from "../../features/auth/user";
import AdminWrapper from "../components/AdminWrapper";

function GenerateCode() {
  const dispatch = useDispatch();
  const [isGenerated, setIsGenerated] = useState(false);

  // const { restricted, isLoading, isError, message } = useSelector(
  //   (state) => state.userInfo
  // );

  const { allUser, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.userInfo
  );

  const [codePrice, setCodePrice] = useState(0);
  const [codeType, setCodeType] = useState("");
  const [id, setId] = useState();

  const generateCode = (e) => {
    e.preventDefault();

    const userData = {
      id,
      codePrice,
      codeType,
    };

    dispatch(getCode(userData));

    setIsGenerated(!isGenerated);
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isGenerated) {
      toast.success("Updated Successfully");
    }

    dispatch(getAllUsers());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, isGenerated]);

  // useEffect(() => {
  //   if (isError) {
  //     console.log(message);
  //   }

  //   if (isGenerated) {
  //     toast.success("Updated Successfully");
  //   }

  //   dispatch(restrictedUsers());

  //   return () => {
  //     dispatch(reset());
  //   };
  // }, [isGenerated]);

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
                <td className="right">Name</td>
                {/* <td className="right">Account Number</td> */}
                <td className="right">TCC CODE</td>
                {/* <td className="right">TCC CODE COST</td> */}
                <td className="right">IMF</td>
                {/* <td className="right">IMF COST</td> */}
                <td className="right">COT</td>
                {/* <td className="right">COT cost</td> */}
                <td className="right">ATC CODE</td>
                {/* <td className="right">ATC CODE COST</td> */}
              </tr>
            </thead>
            <tbody>
              {allUser.length > 0 &&
                allUser?.map((user) => (
                  <tr key={user?._id}>
                    <td>
                      <input
                        onChange={() => setId(user?._id)}
                        type="checkbox"
                        name=""
                        id=""
                      />
                    </td>
                    <td className="right">{user?.username}</td>
                    {/* <td className="right">{user?.account_number}</td> */}
                    <td className="right"> {user?.tcc_code} </td>
                    {/* <td className="right">{user?.tcc_code_price}</td> */}
                    <td className="right"> {user?.imf_code}</td>
                    {/* <td className="right"> {user?.imf_code_price} </td> */}
                    <td className="right">{user?.cot_code}</td>
                    {/* <td className="right">{user?.cot_code_price}</td> */}
                    <td className="right"> {user?.atc_code} </td>
                    {/* <td className="right">{user?.atc_code_price}</td> */}
                  </tr>
                ))}
            </tbody>
          </table>

          {/* <form onSubmit={generateCode}>
            <div className="form__group">
              <input
                onChange={(e) => setCodePrice(e.target.value)}
                type="number"
                placeholder="Enter Cost"
                required
              />
            </div>
            <div className="form__group">
              <select
                value={codeType}
                onChange={(e) => setCodeType(e.target.value)}
                name=""
                id=""
              >
                <option value="">Select Code</option>
                <option value="tcc_code">tcc</option>
                <option value="imf_code">imf</option>
                <option value="cot_code">cot</option>
                <option value="atc_code">atc</option>
              </select>
            </div>
            <div className="form__group btn">
              <button>Generate Code</button>
            </div>
          </form> */}
        </div>
      </div>
    </AdminWrapper>
  );
}

export default GenerateCode;
