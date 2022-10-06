import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";
import "./App.scss";
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/Dashboard/Dashboard";
import UserInfor from "./pages/UserInfor/UserInfor";
import UserDetail from "./pages/UserDetail/UserDetail";
import AddUserInfor from "./pages/AddUserInfor/AddUserInfor";
import AddUserDetail from "./pages/AddUserDetail/AddUserDetail";

function App() {
  const admin = localStorage.getItem("admin");

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          {/* {admin === "true" && ( */}
            <Route
              path="/admin-dashboard"
              element={<Dashboard />}
            />
            <Route
              path="/function-user"
              element={<AddUserInfor />}
            />
            <Route
              path="/user-information"
              element={<UserInfor />}
            />
            <Route
              path="/function-detail"
              element={<AddUserDetail />}
            />
            <Route
              path="/user-detail"
              element={<UserDetail />}
            />
          {/* )} */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
