import { Link, useNavigate } from "react-router-dom";
import CreateInvoiceCard from "../component/CreateInvoiceCard";
import { useEffect, useState } from "react";
import { getUserItems, deleteItem } from "../component/ApiFunction";
import CustomModal from "../component/CustomModal";
import NewInvoice from "./NewInvoice";
import CreateItem from "./client/CreateItem";

export default function Items() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createItemModal, setCreateItemModal] = useState(false);
  const [dataForEdit, setDataForEdit] = useState(null);
  const navigate = useNavigate();

  const fetchUserItems = () => {
    getUserItems(setItems, setLoading);
  }

  const editItem = (item) => {
    setDataForEdit(item);
    setTimeout(() => setCreateItemModal(true), 100);
  }

  useEffect(() => {
    fetchUserItems();
  }, []);

  console.log("Items:", items);
  

  return (
    <div className="container">
      <div className="card my-4 border-0 previous-invoice w-100">
        <div
          className={`card-header d-flex justify-content-between flex-lg-row flex-md-row flex-column align-items-center border-0 bg-white gap-3 ${loading ? "border-bottom border-1" : ""
            }`}
        >
          <div>
            <i className="fas fa-table me-1"></i> Items
          </div>
          <div className="d-flex flex-wrap justify-content-center gap-lg-0 gap-md-3 gap-2">
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="search-input-field"
                placeholder="Search by Item Name"
              />
              <i className="fa fa-search px-3"></i>
            </div>
            <div className="btn new-invoice-btn ms-2" onClick={() => setCreateItemModal(true)} >
              <span className="">New Item</span>
              {/* <i className="fa fa-plus d-lg-none d-md-none d-block"></i> */}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center my-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : items.length === 0 ? (
          <CreateInvoiceCard
            length={items.length}
            icon={"fa-solid fa-list"}
            heading="Keep track of your items."
            title={`Add your commonly invoiced items and <br/> speed up your invoice creation.`}
            btnTitle="New Item"
            link="/item/new"
          />
        ) : (
          <div className="card-body border-top p-0">
            <div className="table-responsive">
              <table className="table mb-0 table-hover table-bordered">
                <thead className="border-bottom">
                  <tr style={{ fontSize: "0.8rem" }} className="table-head">
                    <th>Item Name</th>
                    {/* <th>Item Category</th> */}
                    <th>Item Code</th>
                    <th>Item Price</th>
                    <th>Item Quantity</th>
                    <th>Unit Measurement</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr
                      className="table-head"
                      style={{ fontSize: "0.9rem", cursor: "pointer" }}
                      key={item._id}
                    >
                      <td>{item.item_name}</td>
                      {/* <td>{item.item_category}</td> */}
                      <td>{item.item_code}</td>
                      <td>{item.price}</td>
                      <td>{item.unit}</td>
                      <td>{item.unit_measure}</td>
                      <td>
                        <div className="d-flex justify-content-center gap-3 align-items-center position-relative">
                          <button
                            className="btn btn-primary btn-sm fa-regular fa-pen-to-square rounded-circle py-2"
                            onClick={() =>
                              editItem(item)
                            }
                          ></button>
                          <button
                            className="btn btn-danger btn-sm fa-solid fa-trash rounded-circle py-2"
                            onClick={() => deleteItem(item.item_id, setItems)}
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
        isOpen={createItemModal}
        onClose={() => setCreateItemModal(false)}
      >
        <CreateItem onClose={() => setCreateItemModal(false)} fetchUserItems={fetchUserItems} existingItem={dataForEdit} location={"items"} />
      </CustomModal>
    </div>
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
