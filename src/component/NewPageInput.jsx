export default function NewPageInput({
  label,
  change,
  name,
  type,
  placeholder,
  row,
  value,
  readOnly,
  className,
}) {
  return (
    <div className={`row ${row ? "flex-column" : "align-items-center flex-row"}`}>
      {/* Label */}
      {label && (
        <div className={`${row ? "" : "col-md-3"} ${!label ? "d-none" : ""}`}>
          <label htmlFor={name} className="text-dark fs-o8">
            {label}
          </label>
        </div>
      )}

      {/* Input */}
      <div className={`${(!label || row) ? "col-12" : "col-md-9"}`}>
        <input
          type={type}
          name={name}
          value={value} // Controlled input
          onChange={change ? change : undefined} // Optional change handler
          className={`py-2 px-2 border border-2 border-secondary-subtle input-field rounded fs-o8 fw-medium text-secondary w-100 ${className}`} // Additional class support
          placeholder={placeholder || ""}
          required
          readOnly={readOnly}
          aria-label={label} // Accessibility improvement
        />
      </div>
    </div>
  );
}
