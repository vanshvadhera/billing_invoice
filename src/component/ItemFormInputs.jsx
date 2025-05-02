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
    <div>
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
        <label>Unit Measure</label>
        <div className="d-flex gap-3">
          <div className="form-check">
            <input
              type="radio"
              id="kg"
              name="unit_measure"
              value="kg"
              checked={formData.unit_measure === "kg"}
              onChange={handleChange}
              className="form-check-input"
            />
            <label className="form-check-label" htmlFor="kg">
              kg
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="g"
              name="unit_measure"
              value="g"
              checked={formData.unit_measure === "g"}
              onChange={handleChange}
              className="form-check-input"
            />
            <label className="form-check-label" htmlFor="g">
              g
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="pcs"
              name="unit_measure"
              value="pcs"
              checked={formData.unit_measure === "pcs"}
              onChange={handleChange}
              className="form-check-input"
            />
            <label className="form-check-label" htmlFor="pcs">
              pcs
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="loose"
              name="unit_measure"
              value="loose"
              checked={formData.unit_measure === "loose"}
              onChange={handleChange}
              className="form-check-input"
            />
            <label className="form-check-label" htmlFor="loose">
              loose
            </label>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label>Price</label>
        <input name="price" value={formData.price} onChange={handleChange} className="form-control" />
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-secondary" onClick={handleClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading} onClick={handleSubmit} >
          {loading ? "Saving..." : isEditMode ? "Update Item" : "Add Item"}
        </button>
      </div>
    </div>
  );
}
