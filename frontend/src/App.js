import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";
import "./App.scss";

import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  const admin = localStorage.getItem("admin");

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {admin === "true" && (
            <Route
              path="/admin-dashboard"
              element={<Dashboard />}
            />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
