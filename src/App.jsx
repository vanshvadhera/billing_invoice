// src/App.js
import {
  BrowserRouter,
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
import Report from "./pages/Report";
import CreateItem from "./pages/client/CreateItem";

// Utility function
const isAuthenticated = () => {
  const token = Cookies.get("access_token");
  return !!token;
};

// Main App Component
const App = () => {
  const location = useLocation();
  const isAuthPage = ["/login", "/forgot-password"].includes(
    location.pathname
  );

  const NotFound = () => {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1 style={{ fontSize: "4rem", marginBottom: "1rem" }}>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
      </div>
    );
  };


  return (
    <div>
      {!isAuthPage && <Header />}
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated() ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/forgot-password"
          element={
            isAuthenticated() ? <Navigate to="/" replace /> : <ForgotPassword />
          }
        />

        {/* Protected Routes */}
        <Route path="/" element={<PrivateRoute element={<Invoice />} />} />
        <Route path="/create/client" element={<PrivateRoute element={<SignUp />} />} />
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
        <Route
          path="/report"
          element={<PrivateRoute element={<Report />} />}
        />
        <Route path="*" element={<NotFound />} />

        {/* Client Create Item */}
      </Routes>
    </div>
  );
};

// Wrap App with Router
const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWithRouter;
