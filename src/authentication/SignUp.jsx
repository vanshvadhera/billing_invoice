import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../component/ApiFunction";
import NewPageInput from "../component/NewPageInput";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  const phoneExp = /^\d{10}$/;
  const emailExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const isPasswordMatch = password === confirmPassword;
  const isPhoneValid = phoneExp.test(phone);
  const isEmailValid = emailExp.test(email);

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!isPasswordMatch) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage("");
    setLoading(true);

    const requestData = {
      phone: phone,
      email: email,
      password: password,
      user_type: "admin",
      city: city || "Meerut",
    };
    registerUser(requestData, setAlert, navigate, setLoading);
  };

  return (
    <>
      <div className="container top-right">
        {alert && (
          <div
            className={`alert alert-${alert.type} bg-${alert.type} text-white d-flex justify-content-between align-items-center gap-5`}
            role="alert"
          >
            {alert.message}
            <div
              className="fa fa-close pointer-cursor"
              onClick={() => setAlert(false)}
            ></div>
          </div>
        )}
      </div>

      <div
        className="container-fluid d-flex justify-content-center align-items-center flex-column pattern-bg"
        style={{ height: "100vh" }}
      >
        <div className="sign-up-content mb-3">
          <h3 className="text-white">Create an Account</h3>
        </div>
        <div
          className="card p-5 shadow-lg"
          style={{ width: "100%", maxWidth: "350px" }}
        >
          <form onSubmit={handleSignUp}>
            <div className="mb-2">
              <NewPageInput
                label="Phone"
                placeholder="Enter phone number"
                type="number"
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

            <div className="mb-2">
              <NewPageInput
                label="Email"
                placeholder="user@example.com"
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

            <div className="mb-2">
              <NewPageInput
                label="City"
                placeholder="Enter city"
                type="text"
                row="dd"
                change={(e) => setCity(e.target.value)}
                name="city"
              />
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
                  top: "71%",
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
                  top: "71%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              ></i>
            </div>

            {errorMessage && (
              <p className="text-danger fs-08">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="btn btn-dark w-100 mt-3"
              disabled={loading || !isPhoneValid || !isEmailValid}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>

            <div className="mt-3 text-center">
              <p>
                Already have an account? <Link to="/login">Sign In</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
