import { useEffect } from "react";
import AdminWrapper from "../components/AdminWrapper";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div>
      <AdminWrapper>
        <div className="admin__content">
          <h1>Dashboard</h1>
        </div>
      </AdminWrapper>
    </div>
  );
}

export default Dashboard;
