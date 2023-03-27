import React, { useEffect } from "react";
import Navbar from "./Navbar";
import SideNav from "./SideNav";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AdminWrapper({ children }) {
  const [toggle, setToggle] = useState(false);

  const { adminUser } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!adminUser || adminUser?.isAdmin == false) {
      localStorage.clear("adminUser");
      navigate("/admin/login");
    }
  }, [adminUser]);

  return (
    <div>
      <Navbar toggle={toggle} setToggle={setToggle} />
      <div className="admin__dashboard">
        <SideNav toggle={toggle} setToggle={setToggle} />
        <div className="admin__children">{children}</div>
      </div>
    </div>
  );
}

export default AdminWrapper;
