import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../component/ApiFunction";
import NewPageInput from "../component/NewPageInput";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(email, password, setLoading, setAlert, navigate);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isEmailValid = emailRegex.test(email);

  return (
    <div
      className="container-fluid pattern-bg d-flex justify-content-center align-items-center flex-column"
      style={{ height: "100vh" }}
    >
      <div className="login-content mb-3">
        <h3 className="text-white">Login to your Account</h3>
      </div>
      <div
        className="card p-5 shadow-lg"
        style={{ width: "100%", maxWidth: "350px" }}
      >
        <form onSubmit={handleLogin}>
          <div className="mb-2">
            <NewPageInput
              label="Email"
              placeholder="name@client.com"
              type="email"
              row="dd"
              change={(e) => setEmail(e.target.value)}
              name="email"
            />
            {!isEmailValid && email && (
              <div className="text-danger fs-08 mt-2">
                Please enter a valid email address.
              </div>
            )}
          </div>
          <div className="mb-2 position-relative">
            <NewPageInput
              label="Password"
              placeholder="*******"
              type={showPassword ? "text" : "password"}
              row="dd"
              change={(e) => setPassword(e.target.value)}
              name="password"
            />
            <i
              className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "10px",
                top: "71%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            ></i>
          </div>
          <div className="d-flex justify-content-between">
            <Link to="/forgot-password" className="text-muted">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="btn btn-dark w-100 mt-3"
            disabled={!isEmailValid || loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {/* <div className="mt-3 text-center">
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div> */}
        </form>
      </div>

      <div className="container top-right">
        {alert && (
          <div
            className={`alert alert-${alert.type} bg-${alert.type} text-white d-flex justify-content-between align-items-center gap-5`}
            role="alert"
            style={{ zIndex: 1050 }}
          >
            {alert.message}
            <div
              className="fa fa-close pointer-cursor"
              onClick={() => setAlert(null)}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
