import { Link, useNavigate } from "react-router-dom";
import CreateInvoiceCard from "../../component/CreateInvoiceCard";
import { useEffect, useState } from "react";
import { deleteClient, getClients } from "../../component/ApiFunction";
import CustomModal from "../../component/CustomModal";
import CreateClient from "./CreateClient";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createClientModal, setCreateClientModal] = useState(false);
  const [dataForEdit, setDataForEdit] = useState(null);
  const navigate = useNavigate();

  const fetchUserClients = () => {
    // console.log("Fetching clients...");
    getClients(setClients, setLoading);
  };

  const handleClientEdit = (client) => {
    // console.log("Editing client:", client);

    setDataForEdit(client);
    setTimeout(() => setCreateClientModal(true), 100);
  }

  useEffect(() => {
    fetchUserClients();
  }, []);

  return (
    <div className="container">
      <div className="card my-4 border-0 previous-invoice w-100">
        <div
          className={`card-header d-flex justify-content-between flex-lg-row flex-md-row flex-column align-items-center border-0 bg-white gap-3 ${loading ? "border-bottom border-1" : ""
            }`}
        >
          <div>
            <i className="fas fa-table me-1"></i> Clients
          </div>
          <div className="d-flex flex-wrap justify-content-center gap-lg-0 gap-md-3 gap-2">
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="search-input-field"
                placeholder="Search by Client Name"
              />
              <i className="fa fa-search px-3"></i>
            </div>
            <div className="btn new-invoice-btn ms-2 " onClick={() => setCreateClientModal(true)} >
              <span className="">New Client</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center my-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : clients.length === 0 ? (
          <CreateInvoiceCard
            length={clients.length}
            icon={"fa-solid fa-list"}
            heading="Keep track of your clients."
            title={`Add your clients and speed up your invoice creation.`}
            btnTitle="New Client"
            link="/client/new"
            showButton={false}
          />
        ) : (
          <div className="card-body border-top p-0">
            <div className="table-responsive">
              <table className="table mb-0 table-hover table-bordered">
                <thead className="border-bottom">
                  <tr style={{ fontSize: "0.8rem" }} className="table-head">
                    <th>Client Name</th>
                    <th>GST No</th>
                    <th>Email</th>
                    <th>Mobile Number</th>
                    <th>Address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr
                      className="table-head"
                      style={{ fontSize: "0.9rem", cursor: "pointer" }}
                      key={client._id}
                    >
                      <td>{client.name}</td>
                      <td>{client.gst_no}</td>
                      <td>{client.email}</td>
                      <td>{client.mobile_number}</td>
                      <td>{client.address}</td>
                      <td>
                        <div className="d-flex justify-content-center gap-3 align-items-center position-relative">
                          <button
                            className="btn btn-primary btn-sm fa-regular fa-pen-to-square rounded-circle py-2"
                            onClick={() =>
                              handleClientEdit(client)
                            }
                          ></button>
                          <button
                            className="btn btn-danger btn-sm fa-solid fa-trash rounded-circle py-2"
                            onClick={() => {
                              deleteClient(client.client_id, setClients);
                            }}
                          ></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <CustomModal
        isOpen={createClientModal}
        onClose={() => {
          setCreateClientModal(false)
          setDataForEdit(null);
        }}
      >
        <CreateClient onClose={() => {
          setCreateClientModal(false)
          setDataForEdit(null);
        }} fetchUserClients={fetchUserClients} existingClient={dataForEdit} location={"clients"} />
      </CustomModal>
    </div>
  );
}
