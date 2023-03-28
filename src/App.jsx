import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import RegisterUser from "./pages/RegisterUser";
import Dashboard from "./pages/Dashboard";
import Transfer from "./pages/Transfer";
import History from "./pages/History";
import Contact from "./pages/Contact";
import RequestImf from "./pages/RequestImf";
import RequestCot from "./pages/RequestCot";
import RequestAtc from "./pages/RequestAtc";
import RequestTcc from "./pages/RequestTcc";
import TransferManagent from "./admin/TransferMangement/TransferManagent";
import GenerateCode from "./admin/GenerateCode/GenerateCode";
import AdminDashboard from "./admin/Dashboard/Dashboard";
import AdminLogin from "./admin/Login/AdminLogin";
import NewCustomer from "./admin/NewCustomer/NewCustomer";
import ManageCustomers from "./admin/ManageCustomers/ManageCustomers";
import EditUser from "./admin/components/EditUser";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<RegisterUser />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/transactions" element={<History />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/request/imf" element={<RequestImf />} />
        <Route path="/request/cot" element={<RequestCot />} />
        <Route path="/request/atc" element={<RequestAtc />} />
        <Route path="/request/tcc" element={<RequestTcc />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/newcustomer" element={<NewCustomer />} />
        <Route path="/admin/edituser/:id" element={<EditUser />} />
        <Route path="/admin/generate" element={<GenerateCode />} />
        <Route
          path="/admin/transfer_management"
          element={<TransferManagent />}
        />
        <Route path="/admin/managecustomers" element={<ManageCustomers />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
