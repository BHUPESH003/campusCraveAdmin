import React from "react";
import {
  CAvatar,
  CBadge,
  CButton,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import {
  cilBell,
  cilUser,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";

import avatar8 from "./../../assets/images/avatars/8.jpg";
import { useNavigate } from "react-router-dom";
const AppHeaderDropdown = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    console.log("here");
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle
        placement="bottom-end"
        className="py-0 pe-0"
        caret={false}
      >
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">
          Account
        </CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          Updates
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2">
          Settings
        </CDropdownHeader>
        <CDropdownItem>
          <CButton onClick={() => handleLogOut()}>
            <CIcon icon={cilUser} className="me-2" />
            LogOut
          </CButton>
        </CDropdownItem>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCreditCard} className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        {/* <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        {/* <CDropdownDivider />
        <CDropdownItem href="#">
          <CIcon icon={cilLockLocked} className="me-2" />
          Lock Account
        </CDropdownItem> */}
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
