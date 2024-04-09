import React, { useState } from "react";
import { CButton } from "@coreui/react";
import { cilPlus } from "@coreui/icons";
import { useNavigate } from "react-router-dom";
import OrderGrid from "./OrderGrid"; // Assume OrderGrid is in the same folder
import CIcon from "@coreui/icons-react";

function AllOrders() {
  const buttonData = ["All Orders", "Pending", "Accepted", "Shipped", "Delivered"];
  const [statusFilter, setStatusFilter] = useState(null); // Default to show all orders
  const navigate = useNavigate();

  const handleButtonClick = (buttonName) => {
    setStatusFilter(buttonName === "All Orders" ? null : buttonName);
  };

  const handleAddClick = () => {
    navigate("/orders/add/new");
  };

  return (
    <div className="container-fluid">
      <h3>{statusFilter || "All Orders"}</h3>
      <div className="row">
        <div className="col-9">
          {buttonData.map((buttonName, index) => (
            <CButton
              key={index}
              onClick={() => handleButtonClick(buttonName)}
              active={statusFilter === buttonName}
            >
              {buttonName}
            </CButton>
          ))}
        </div>
        <div className="col-3">
          {/* <CButton color="primary" onClick={handleAddClick}>
            <CIcon icon={cilPlus} /> Add New Order
          </CButton> */}
        </div>
      </div>
      <div className="col mt-5">
      <OrderGrid statusFilter={statusFilter} />
      </div>
    </div>
  );
}

export default AllOrders;
