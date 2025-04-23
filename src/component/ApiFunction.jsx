import axios from "axios";
import Cookies from "js-cookie";
import {
  getUserId,
  getAccessToken,
  showSuccess,
  showError,
  showConfirm,
  apiBaseUrl,
} from "../../Helper";

// Get Invoices
export const getUserInvoice = (setInvoices, setLoading) => {
  axios
    .post(apiBaseUrl("/invoices/get-user-invoices"), { user_id: getUserId() })
    .then((res) => {
      const data = res.data?.data || [];
      const activeInvoices = data.filter((inv) => inv.status === "active");
      setInvoices(activeInvoices);
    })
    .catch((err) => {
      console.error("Error fetching invoices:", err);
    })
    .finally(() => {
      setLoading(false);
    });
};

// Add or Update Invoice
export const addUpdateInvoice = (data, navigate) => {
  axios
    .post(apiBaseUrl("/invoices/add-update"), data, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      console.log("✅ Invoice saved:", res.data);
      navigate("/invoice/generated-invoice", { state: data });
    })
    .catch((err) => {
      console.error("❌ Error saving invoice:", err);
    });
};

// Delete Invoice
export const deleteInvoice = (invoice_id, setInvoices) => {
  showConfirm().then((result) => {
    if (result.isConfirmed) {
      axios
        .post(apiBaseUrl("/invoices/add-update"), {
          user_id: getUserId(),
          invoice_id,
          status: "inactive",
        })
        .then(() => {
          showSuccess("Item has been deleted");
          setInvoices((prev) =>
            prev.filter((invoice) => invoice.invoice_id !== invoice_id)
          );
        })
        .catch(() => {
          showError("Failed to delete the item.");
        });
    }
  });
};

// Add or Update Client
export const addOrUpdateClient = (clientData, navigate, setLoading) => {
  axios
    .post(apiBaseUrl("/clients/add-update"), clientData)
    .then(() => {
      setLoading(false);
      showSuccess("Client has been saved successfully");
      navigate("/clients");
    })
    .catch(() => {
      setLoading(false);
      showError("There was an error saving the client information.");
    });
};

// Get Clients
export const getClients = (setClients, setLoading) => {
  axios
    .post(apiBaseUrl("/clients/get-user-clients"), { user_id: getUserId() })
    .then((res) => {
      setClients(res.data.data || []);
      setLoading(false);
    })
    .catch(() => {
      setLoading(false);
      console.error("Error fetching clients");
    });
};

// Delete Client
export const deleteClient = (client_id, setClients) => {
  showConfirm("Are you sure?").then((result) => {
    if (result.isConfirmed) {
      axios
        .post(apiBaseUrl("/clients/add-update"), {
          user_id: getUserId(),
          client_id,
          status: "inactive",
        })
        .then(() => {
          showSuccess("Client has been deleted");
          setClients((prev) =>
            prev.filter((client) => client.client_id !== client_id)
          );
        })
        .catch(() => {
          showError("Failed to delete the client.");
        });
    }
  });
};

// Get User Profile
export const getUserProfile = (setLoading, setFormData) => {
  axios
    .get(apiBaseUrl(`/user/get-user/${getUserId()}`), {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    .then((res) => {
      setFormData((prev) => ({ ...prev, ...res.data.data }));
      setLoading(false);
    })
    .catch(() => {
      showError("Failed to fetch user data.");
      setLoading(false);
    });
};

// Update Profile
export const updateProfile = (setIsSubmitting, formData) => {
  axios
    .post(apiBaseUrl("/user/update-profile"), formData)
    .then(() => {
      showSuccess("Profile has been updated");
    })
    .catch((err) => {
      const msg = err.response?.data?.msg || "Update failed";
      showError(msg);
    })
    .finally(() => {
      setIsSubmitting(false);
    });
};

// Add or Update Item
export const addOrUpdateItem = (itemData, navigate, setLoading) => {
  axios
    .post(apiBaseUrl("/items/add-update"), itemData)
    .then(() => {
      setLoading(false);
      showSuccess("Item has been saved successfully");
      navigate("/items");
    })
    .catch(() => {
      setLoading(false);
      showError("Failed to save the item");
    });
};


// Get Items
export const getUserItems = (setItems, setLoading) => {
  axios
    .post(apiBaseUrl("/items/get-user-items"), { user_id: getUserId() })
    .then((res) => {
      const activeItems = res.data.data.filter(
        (item) => item.status === "active"
      );
      setItems(activeItems);
    })
    .catch(() => {
      console.log("Error fetching items");
    })
    .finally(() => {
      setLoading(false);
    });
};

// Delete Item
export const deleteItem = (item_id, setItems) => {
  showConfirm().then((result) => {
    if (result.isConfirmed) {
      axios
        .post(apiBaseUrl("/items/add-update"), {
          user_id: getUserId(),
          item_id,
          status: "inactive",
        })
        .then(() => {
          showSuccess("Item has been deleted");
          setItems((prev) => prev.filter((item) => item.item_id !== item_id));
        })
        .catch(() => {
          showError("Failed to delete the item.");
        });
    }
  });
};

// Login User
export const loginUser = (email, password, setLoading, setAlert, navigate) => {
  setLoading(true);
  axios
    .post(apiBaseUrl("/user/login"), { email, password })
    .then((res) => {
      const { accessToken, refreshToken } = res.data.data.tokenData;
      const userId = res.data.data.user_id;

      Cookies.set("access_token", accessToken, { expires: 1 });
      Cookies.set("refresh_token", refreshToken, { expires: 1 });
      Cookies.set("user_id", userId, { expires: 1 });

      setAlert({ type: "success", message: "Login successful!" });
      setTimeout(() => {
        setAlert(null);
        navigate("/");
      }, 2000);
    })
    .catch(() => {
      setAlert({ type: "danger", message: "Incorrect credentials" });
      setTimeout(() => setAlert(null), 2000);
    })
    .finally(() => {
      setLoading(false);
    });
};

// Register User
export const registerUser = (data, setAlert, navigate, setLoading) => {
  axios
    .post(apiBaseUrl("/user/signup"), data)
    .then((res) => {
      Cookies.set("access_token", res.data.data.accessToken, { expires: 7 });
      Cookies.set("refresh_token", res.data.data.refreshToken, { expires: 7 });
      Cookies.set("user_id", res.data.data.user_id, { expires: 7 });

      setAlert({ type: "success", message: "User created successfully" });
      setTimeout(() => {
        setAlert(null);
        navigate("/");
      }, 2000);
    })
    .catch((err) => {
      const errorMsg = err.response?.data?.msg?.message || "Signup failed.";
      setAlert({ type: "danger", message: errorMsg });
      setTimeout(() => setAlert(null), 2000);
    })
    .finally(() => {
      setLoading(false);
    });
};

// Reset Password
export const resetPassword = (data, setAlert, navigate, setLoading) => {
  axios
    .post(apiBaseUrl("/user/reset-password"), data)
    .then((res) => {
      setAlert({ type: "success", message: res.data.msg });
      setTimeout(() => {
        setAlert(null);
        navigate("/login");
      }, 3000);
    })
    .catch((err) => {
      const msg = err.response?.data?.msg || "Something went wrong.";
      setAlert({ type: "danger", message: msg });
      setTimeout(() => setAlert(null), 2000);
    })
    .finally(() => {
      setLoading(false);
    });
};

// Upload logo
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(apiBaseUrl("/user/upload-file"), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data.file_url;
};

// Upload Signature
export const uploadBlobFile = async (blob, filename = "file.png") => {
  const formData = new FormData();
  formData.append("file", blob, filename);

  const response = await fetch(apiBaseUrl("/user/upload-file"), {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload file");
  }

  const result = await response.json();
  return result?.data?.file_url;
};
