import $ from "jquery";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../Helper";
// import logo from "../assets/images/innovartan_Logo.png";
// import Button from "./Button";
import Cookies from "js-cookie";
export default function Header() {
  const [isDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const isNewInvoicePage = location.pathname === "/invoice/new-invoice" || location.pathname === "/invoice/preview-invoice" || "/invoice/generated-invoice";
  const [authStatus, setAuthStatus] = useState(isAuthenticated());
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      isDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuVisible(false);
  }, [location]);

  useEffect(() => {
    const body = document.body;
    if (isMobileMenuVisible) {
      body.classList.add("mobile-menu-visible");
    } else {
      body.classList.remove("mobile-menu-visible");
    }

    const handleDropdownClick = function () {
      $(this).prev("ul").slideToggle(500);
      $(this).toggleClass("active");
      $(this).prev(".mega-menu").slideToggle(500);
    };

    $(".mobile-menu li.dropdown .dropdown-btn").on(
      "click",
      handleDropdownClick
    );

    return () => {
      $(".mobile-menu li.dropdown .dropdown-btn").off(
        "click",
        handleDropdownClick
      );
      body.classList.remove("mobile-menu-visible");
    };
  }, [isMobileMenuVisible]);

  const handleLogout = (e) => {
    e.preventDefault();
    Object.keys(Cookies.get()).forEach((cookie) => Cookies.remove(cookie));
    localStorage.clear();
    setAuthStatus(false);
    navigate("/login");
  };
  

  const toggleMobileMenu = () => {
    setIsMobileMenuVisible(!isMobileMenuVisible);
  };
  return (
    <>
      <nav
        className={`navbar py-4 flex-column mt-0 ${
          isNewInvoicePage ? "" : "sticky-top"
        } border-bottom border-2`}
      >
        <div className="container align-items-center pe-lg-0 pe-md-auto pe-auto">
          <Link to="/">
            {/* <img src={logo} alt="" height="auto" className="logo-img" /> */}
            <h4 className="text-white mb-0">Invoice</h4>
          </Link>

          <span
            className="fa fa-bars d-lg-none d-block fs-3 text-white"
            onClick={() => toggleMobileMenu()}
          ></span>

          <div
            className={`mobile-menu ${isMobileMenuVisible ? "visible" : ""}`}
          >
            <div className="menu-backdrop"></div>

            <nav className="menu-box">
              <div className="upper-box">
                <div className="nav-logo">
                  <Link to={"/"}>
                    {/* <img src={logo} alt="" height="auto" className="logo-img" /> */}
                    <p>Invoice</p>
                  </Link>
                </div>
                <div className="close-btn" onClick={() => toggleMobileMenu()}>
                  <i className="icon fa fa-times"></i>
                </div>
              </div>

              <ul className="navigation clearfix ps-0">
                <li className="current">
                  <Link to={"/invoices"}>Invoice</Link>
                </li>

                <li>
                  <Link>Reports</Link>
                </li>

                <li>
                  <Link to="/items">Items</Link>
                </li>

                <li>
                  <Link to="/clients"> Clients</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  {authStatus ? (
                    <Link onClick={handleLogout}>Logout</Link>
                  ) : (
                    <Link to="/login">Login</Link>
                  )}
                </li>
              </ul>
            </nav>
          </div>

          {/* desktop navbar */}
          <div className="d-lg-block d-md-none d-none">
            <ul className="d-flex list-unstyled align-items-center mb-0 main-nav">
              <li className="nav-item ">
                <Link className="nav-link " to={"/invoices"}>
                  Invoice
                </Link>
              </li>

              <li className="nav-item ">
                <a className="nav-link ">Reports</a>
              </li>
              <li className="nav-item ">
                <Link className="nav-link " to="/items">
                  Items
                </Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link " to="/clients">
                  Clients
                </Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link " to="/profile">
                  Profile
                </Link>
              </li>

              <li className="nav-item">
                {authStatus ? (
                  <Link className="nav-link" onClick={handleLogout}>
                    Logout
                  </Link>
                ) : (
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
