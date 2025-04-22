import React, { useState } from 'react';
const ButtonGroup = () => {
  const [activeButton, setActiveButton] = useState('all');

  const handleButtonClick = (button) => {
    setActiveButton(button);
   };

  return (
    <div className="button-group">
      <button
        className={`btn btn-all ${activeButton === 'all' ? 'active' : ''}`}
        onClick={() => handleButtonClick('all')}
      >
        All invoices
      </button>
      <button
        className={`btn btn-outstanding ${activeButton === 'outstanding' ? 'active' : ''}`}
        onClick={() => handleButtonClick('outstanding')}
      >
        Outstanding
      </button>
      <button
        className={`btn btn-paid ${activeButton === 'paid' ? 'active' : ''}`}
        onClick={() => handleButtonClick('paid')}
      >
        Paid
      </button>
    </div>
  );
};

export default ButtonGroup;
