import React from "react";
import CIcon from "@coreui/icons-react";
import { CButton } from "@coreui/react";

import { cilPlus } from "@coreui/icons";
import { useNavigate } from "react-router-dom";
function Staff() {
  const navigate = useNavigate();
  const handleAddClick = () => {
    navigate("/staff/add/new");
  };
  return (
    <div className="col-3">
      <CButton color="primary" onClick={handleAddClick}>
        <CIcon icon={cilPlus} /> Add New Staff member
      </CButton>
    </div>
  );
}

export default Staff;
