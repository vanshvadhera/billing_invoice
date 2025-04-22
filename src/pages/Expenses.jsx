import { Link, useNavigate } from "react-router-dom";
import CreateInvoiceCard from "../component/CreateInvoiceCard";
export default function Expenses() {
  const navigate = useNavigate();
  let expenses = [];
  return (
    <>
      <div className="container">
        <div className="card my-4 border-0 previous-invoice w-100 ">
          <div className="card-header d-flex justify-content-between flex-lg-row flex-md-row flex-column align-items-center border-0 bg-white gap-3">
            <div>
              <i className="fas fa-table me-1"></i> Expenses
            </div>
            <div className="d-flex">
              <div className="d-flex align-items-center ">
                <input
                  type="text"
                  className="search-input-field "
                  placeholder="Search by Item Name"
                />
                <i className="fa fa-search px-3"></i>
              </div>

              <Link
                to="/expense/new"
                className="btn new-invoice-btn ms-2 pt-2 pb-0"
              >
                <span className="d-lg-block d-md-block d-none">New Expenses</span>
                <i className="fa fa-plus d-lg-none d-md-none d-block"></i>
              </Link>
            </div>
          </div>

          {expenses.length === 0 ? (
            <>
              <CreateInvoiceCard
                length={expenses.length}
                icon = {"fa-solid fa-receipt"}
                heading="Easy Expense Tracker"
                title={`Scan any receipt and Invoice Simple<br> captures the key info automatically`}
                btnTitle="Upload your receipt"
                link="/expense/new"
              />
            </>
          ) : (
            <>
              <div
                className={`card-body border-top  ${
                    expenses.length === 0 ? "" : "p-0"
                }`}
              >
                <div className="table-responsive">
                  <table
                    className="table mb-0 table-hover table-bordered"
                    id="datatablesSimple"
                  >
                    <thead className="border-bottom">
                      <tr style={{ fontSize: "0.8rem" }} className="table-head">
                        <th style={{ width: "30%" }}>Description</th>
                        <th style={{ width: "40%" }}>Additional Details</th>
                        <th style={{ width: "20%" }}>Rate</th>
                        <th style={{ width: "10%" }}>Taxable</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        className="table-head"
                        style={{ fontSize: "0.9rem", cursor: "pointer" }}
                        onClick={() => navigate("/expense/new")}
                      >
                        <td>Lorem ipsum dolor sit amet</td>
                        <td>lorem</td>
                        <td>444</td>
                        <td>
                          <div className="form-check">
                            <input
                              className="form-check-input border-dark"
                              type="checkbox"
                              value=""
                              id="flexCheckChecked"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr
                        className="table-head"
                        style={{ fontSize: "0.9rem", cursor: "pointer" }}
                        onClick={() => navigate("/expense/new")}
                      >
                        <td>knowledge</td>
                        <td>lorem</td>
                        <td>444</td>
                        <td>
                          <div className="form-check">
                            <input
                              className="form-check-input border-dark"
                              type="checkbox"
                              value=""
                              id="flexCheckChecked"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
          
        </div>
      </div>
    </>
  );
}

{
  /* <div className="card-body  d-block d-md-none d-lg-none border-top border-1 ">
            <table className="table table-borderless w-100 mb-0">
              <tbody className="bg-transparent">
                <tr>
                  <td className="fw-bold p-0 w-50">Description</td>
                  <td className="text-end">dhadfadfads</td>
                </tr>
                <tr>
                  <td className="fw-bold p-0 w-50">Additional Details</td>
                  <td className="text-end">dhadfadfads</td>
                </tr>
                <tr>
                  <td className="fw-bold p-0 w-50">Rate</td>
                  <td className="text-end">333</td>
                </tr>
                <tr>
                  <td className="fw-bold p-0 w-50">Taxable</td>
                  <td className="text-end">
                    <div className="form-check d-flex justify-content-end">
                      <input
                        className="form-check-input border-dark"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div> */
}
