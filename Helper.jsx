import Cookies from "js-cookie";
import Swal from "sweetalert2";

export const isAuthenticated = () => {
  return !!Cookies.get("access_token");
};

// Cookie helpers
export const getAccessToken = () => Cookies.get("access_token");
export const getUserId = () => Cookies.get("user_id");

// SweetAlert helpers
export const showSuccess = (msg = "Operation successful!") => {
  Swal.fire({
    title: "Success",
    text: msg,
    icon: "success",
    timer: 3000,
    showConfirmButton: false,
  });
};

export const showError = (msg = "Something went wrong!") => {
  Swal.fire({
    title: "Error",
    text: msg,
    icon: "error",
    timer: 3000,
    showConfirmButton: false,
  });
};

export const showConfirm = (title = "Are you sure?") => {
  return Swal.fire({
    title: title,
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });
};
