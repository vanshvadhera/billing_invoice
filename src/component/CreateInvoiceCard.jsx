import { Link } from "react-router-dom";
const CreateInvoiceCard = ({
  length,
  heading,
  title,
  btnTitle,
  link,
  icon,
}) => {
  return (
    <div className={`card-body border-top ${length === 0 ? "" : "p-0"}`}>
      <div className="text-center py-5">
        <i className={` ${icon} fs-4 mb-2`}></i>
        <h6 className="mb-2 fw-bold">{heading}</h6>
        <p
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />
        <Link
          to={link}
          className="btn new-invoice-btn ms-2 justify-content-center d-inline"
        >
          <i className="fa fa-plus me-1"></i> {btnTitle}
        </Link>
      </div>
    </div>
  );
};
export default CreateInvoiceCard;
