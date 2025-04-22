import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { resetPassword } from "../component/ApiFunction";
import NewPageInput from "../component/NewPageInput";

const ForgotPassword = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isResetRequested, setIsResetRequested] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const phoneExp = /^\d{10}$/;

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert({
        type: "danger",
        message: "Password and confirm password must match.",
      });
      setTimeout(() => setAlert(null), 2000);
      return;
    }

    setLoading(true);

    const requestData = {
      phone,
      password,
      confirmPassword,
    };
    resetPassword(requestData, setAlert, navigate, setLoading);
  };

  const isPhoneValid = phoneExp.test(phone);

  return (
    <div
      className="container-fluid pattern-bg d-flex justify-content-center align-items-center flex-column"
      style={{ height: "100vh" }}
    >
      <div className="login-content mb-3">
        <h3 className="text-white">Reset Your Password</h3>
      </div>
      <div
        className="card p-5 shadow-lg"
        style={{ width: "100%", maxWidth: "350px" }}
      >
        <form onSubmit={handleResetPassword}>
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

          <div className="mb-2">
            <NewPageInput
              label="Phone"
              placeholder="Enter phone number"
              type="text"
              row="dd"
              change={(e) => setPhone(e.target.value)}
              name="phone"
            />
            {!isPhoneValid && phone && (
              <div className="text-danger fs-08 mt-2">
                Please enter a valid 10-digit phone number.
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
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "72%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            ></i>
          </div>

          <div className="mb-2 position-relative">
            <NewPageInput
              label="Confirm Password"
              placeholder="*******"
              type={showConfirmPassword ? "text" : "password"}
              row="dd"
              change={(e) => setConfirmPassword(e.target.value)}
              name="confirmPassword"
            />

            <i
              className={`fa ${
                showConfirmPassword ? "fa-eye" : "fa-eye-slash"
              }`}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "72%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            ></i>
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100 mt-3"
            disabled={loading || !isPhoneValid}
          >
            {loading ? "Resetting..." : "Reset Your Password"}
          </button>

          <div className="mt-3 text-center">
            <p>
              Remembered your password? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
