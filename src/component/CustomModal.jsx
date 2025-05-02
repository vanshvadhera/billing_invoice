// import React from "react";
// import styles from "./CustomModal.module.css";
// import CloseIcon from "@mui/icons-material/Close";

// const CustomModal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null; // Don't render anything if modal is closed

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.modal}>
//         <button className={styles.closeButton} onClick={onClose}>
//           <CloseIcon style={{ fontSize: "30px" }} />
//         </button>
//         <div className={styles.content}>{children}</div>
//       </div>
//     </div>
//   );
// };

// export default CustomModal;

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "./CustomModal.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "0.5px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 2,
  zIndex: 10,
  // overflowY: "auto",
  maxHeight: "80vh", // Ensures modal doesn't exceed viewport
};

export default function CustomModal({ isOpen, onClose, children }) {
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={styles.container} >{children}</Box>
      </Modal>
    </div>
  );  
}
