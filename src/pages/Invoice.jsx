import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CreateInvoiceCard from "../component/CreateInvoiceCard";
import Pagination from "../component/Pagination";
import { deleteInvoice, getUserInvoice } from "../component/ApiFunction";
// import { getUserId } from "../utils/auth";

export default function Invoice() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    getUserInvoice(setInvoices, setLoading);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredInvoices = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return term
      ? invoices.filter((invoice) =>
          invoice.invoiceNumber?.toLowerCase().includes(term)
        )
      : invoices;
  }, [searchTerm, invoices]);

  const currentInvoices = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredInvoices.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredInvoices, currentPage]);

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);

  return (
    <div className="container mt-4">
      <div className="card mb-4 border-0 previous-invoice w-100">
        <div className="card-header d-flex justify-content-end flex-lg-row flex-md-row flex-column align-items-center border-0 bg-white gap-3">
          <div className="d-flex">
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="search-input-field"
                placeholder="Search by Invoice Number"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <i className="fa fa-search px-3"></i>
            </div>

            <Link
              to="/invoice/new-invoice"
              className="btn new-invoice-btn ms-2 d-flex align-items-center"
            >
              <i className="fa fa-plus me-1"></i>New Invoice
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="text-center my-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredInvoices.length === 0 ? (
          <CreateInvoiceCard
            length={invoices.length}
            heading="Create your first invoice."
            title={`Get paid faster with Invoice Simple <br /> invoice creation.`}
            btnTitle="New Invoice"
            link="/invoice/new-invoice"
          />
        ) : (
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table mb-0 table-hover table-bordered">
                <thead>
                  <tr style={{ fontSize: "0.8rem" }} className="table-head">
                    <th>Invoice No.</th>
                    <th>Client Name</th>
                    <th>Issued Date</th>
                    <th>Balance Due</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentInvoices.map((invoice) => (
                    <tr
                      key={invoice.invoice_id}
                      className="table-head"
                      style={{ fontSize: "0.9rem" }}
                    >
                      <td>{invoice.invoiceNumber}</td>
                      <td>{invoice.billName}</td>
                      <td>{invoice.date}</td>
                      <td>{invoice.calculatedTotal}</td>
                      <td>
                        <div className="d-flex justify-content-center gap-3 align-items-center position-relative">
                          <button
                            className="btn btn-primary btn-sm fa-regular fa-pen-to-square rounded-circle py-2"
                            onClick={() =>
                              navigate(`/invoice/edit-invoice`, {
                                state: invoice,
                              })
                            }
                          />

                          <button
                            className="btn btn-danger btn-sm fa-solid fa-trash rounded-circle py-2"
                            onClick={() =>
                              deleteInvoice(invoice.invoice_id, setInvoices)
                            }
                          ></button>
                          <i className="fa-solid fa-ellipsis-vertical fs-5 pointer-cursor"></i>

                          <div className="dropdown-menu invoice-dropdown">
                            <button className="dropdown-item py-2 d-flex justify-content-between align-items-center">
                              Mark Paid{" "}
                              <i className="fa-solid fa-arrow-right"></i>
                            </button>
                            <button className="dropdown-item py-2 d-flex justify-content-between align-items-center">
                              Get Link{" "}
                              <i className="ms-auto fa-solid fa-link"></i>
                            </button>
                            <button className="dropdown-item py-2 d-flex justify-content-between align-items-center">
                              Email{" "}
                              <i className="ms-auto fa-regular fa-envelope"></i>
                            </button>
                            <button className="dropdown-item py-2 d-flex justify-content-between align-items-center">
                              Print{" "}
                              <i className="ms-auto fa-solid fa-print"></i>
                            </button>
                            <button className="dropdown-item text-danger py-2 d-flex justify-content-between align-items-center">
                              Delete{" "}
                              <i className="ms-auto fa-solid fa-trash-can"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!loading && filteredInvoices.length > 0 && (
          <div className="card-footer py-2 px-3">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
