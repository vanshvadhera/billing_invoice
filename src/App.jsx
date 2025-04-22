// src/App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";
import Header from "./component/Header";
import Login from "./authentication/Login";
import ForgotPassword from "./authentication/ForgotPassword";
import SignUp from "./authentication/SignUp";
import Invoice from "./pages/Invoice";
import NewInvoice from "./pages/NewInvoice";
import GeneratedInvoice from "./pages/GeneratedInvoice";
import Items from "./pages/Items";
import ItemForm from "./pages/ItemForm";
import Expenses from "./pages/Expenses";
import ExpenseForm from "./pages/ExpenseForm";
import Profile from "./pages/Profile";
import Clients from "./pages/client/Clients";
import ClientForm from "./pages/client/ClientForm";
import PrivateRoute from "./component/PrivateRoute";
import Pdfpage from "./pages/Pdfpage";

// Utility function
const isAuthenticated = () => {
  const token = Cookies.get("access_token");
  return !!token;
};

// Main App Component
const App = () => {
  const location = useLocation();
  const isAuthPage = ["/login", "/signup", "/forgot-password"].includes(
    location.pathname
  );

  return (
    <div>
      {!isAuthPage && <Header />}
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated() ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuthenticated() ? <Navigate to="/" replace /> : <SignUp />}
        />
        <Route
          path="/forgot-password"
          element={
            isAuthenticated() ? <Navigate to="/" replace /> : <ForgotPassword />
          }
        />

        {/* Protected Routes */}
        <Route path="/" element={<PrivateRoute element={<Invoice />} />} />
        <Route
          path="/invoices"
          element={<PrivateRoute element={<Invoice />} />}
        />
        <Route
          path="/invoice/new-invoice"
          element={<PrivateRoute element={<NewInvoice />} />}
        />
        <Route
          path="/invoice/edit-invoice"
          element={<PrivateRoute element={<NewInvoice />} />}
        />
        <Route
          path="/invoice/preview-invoice"
          element={<PrivateRoute element={<GeneratedInvoice />} />}
        />
        <Route
          path="/invoice/generated-invoice"
          element={<PrivateRoute element={< Pdfpage />} />}
        />

        <Route path="/items" element={<PrivateRoute element={<Items />} />} />
        <Route
          path="/item/new"
          element={<PrivateRoute element={<ItemForm />} />}
        />
        <Route
          path="/item/edit"
          element={<PrivateRoute element={<ItemForm />} />}
        />
        <Route
          path="/clients"
          element={<PrivateRoute element={<Clients />} />}
        />
        <Route
          path="/client/new"
          element={<PrivateRoute element={<ClientForm />} />}
        />
        <Route
          path="/client/edit"
          element={<PrivateRoute element={<ClientForm />} />}
        />
        <Route
          path="/expenses"
          element={<PrivateRoute element={<Expenses />} />}
        />
        <Route
          path="/expense/new"
          element={<PrivateRoute element={<ExpenseForm />} />}
        />
        <Route
          path="/profile"
          element={<PrivateRoute element={<Profile />} />}
        />
      </Routes>
    </div>
  );
};

// Wrap App with Router
const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
