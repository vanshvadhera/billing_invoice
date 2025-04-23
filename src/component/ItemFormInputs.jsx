export default function ItemFormInputs({
  formData,
  handleChange,
  handleSubmit,
  handleClose,
  loading,
  isEditMode = false,
  modal = false,
}) {
  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   handleSubmit(); 
  // };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <div className="mb-3">
        <label>Item Name</label>
        <input name="item_name" value={formData.item_name} onChange={handleChange} className="form-control" required />
      </div>
      <div className="mb-3">
        <label>Item Code</label>
        <input name="item_code" value={formData.item_code} onChange={handleChange} className="form-control" />
      </div>
      <div className="mb-3">
        <label>Unit</label>
        <input name="unit" value={formData.unit} onChange={handleChange} className="form-control" />
      </div>
      <div className="mb-3">
        <label>Tax Rate (%)</label>
        <input name="tax_rate" value={formData.tax_rate} onChange={handleChange} className="form-control" />
      </div>
      <div className="mb-3">
        <label>Price</label>
        <input name="price" value={formData.price} onChange={handleChange} className="form-control" />
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-secondary" onClick={handleClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : isEditMode ? "Update Item" : "Add Item"}
        </button>
      </div>
    </form>
  );
}
