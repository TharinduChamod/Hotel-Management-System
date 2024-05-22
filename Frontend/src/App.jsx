import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MenuPage from "./pages/MenuPage";
import AboutPage from "./pages/AboutPage";
import SignUpPage from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";
import EmployeeRegistration from "./pages/EmployeeRegistration";
import UserRegistration from "./pages/UserRegistration";
import EmployeeManagement from "./pages/EmployeeManagement";
import PaymentManagement from "./pages/PaymentManagement";
import EmployeeInformation from "./pages/EmployeeInfomation";

function App() {
  // Check whether there is a user
  const user = localStorage.getItem("token");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Dashboard Login Logic */}
        {user && <Route path="/dashboard" exact element={<Dashboard />} />}
        <Route
          path="/dashboard"
          exact
          element={<Navigate replace to={"/login"} />}
        />

        {/* Employee registration */}
        {user && (
          <Route
            path="/dashboard/employee-registration"
            exact
            element={<EmployeeRegistration />}
          />
        )}
        <Route
          path="/dashboard/employee-registration"
          exact
          element={<Navigate replace to={"/login"} />}
        />

        {/* User Registration */}
        {user && (
          <Route
            path="/dashboard/user-registration"
            exact
            element={<UserRegistration />}
          />
        )}
        <Route
          path="/dashboard/user-registration"
          exact
          element={<Navigate replace to={"/login"} />}
        />

        {/* Employee Management */}
        {user && (
          <Route
            path="/dashboard/employee-management"
            exact
            element={<EmployeeManagement />}
          />
        )}
        <Route
          path="/dashboard/employee-management"
          exact
          element={<Navigate replace to={"/login"} />}
        />

        {/* Payment Management */}
        {user && (
          <Route
            path="/dashboard/payment-management"
            exact
            element={<PaymentManagement />}
          />
        )}
        <Route
          path="/dashboard/payment-management"
          exact
          element={<Navigate replace to={"/login"} />}
        />

        {/* Employee Infomation */}
        {user && (
          <Route
            path="/dashboard/employee-infomation"
            exact
            element={<EmployeeInformation />}
          />
        )}
        <Route
          path="/dashboard/employee-infomation"
          exact
          element={<Navigate replace to={"/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
