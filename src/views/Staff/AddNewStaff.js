import React, { useState } from "react";
import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
  CFormCheck,
} from "@coreui/react";

const AddNewStaff = () => {
  const [formData, setFormData] = useState({
    StaffName: "",
    StaffRank: "",
    Salary: "",
    JoiningDate: "",
    isSalary: "",
    image: "",
  });

  const [modal, setModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    orderId: "",
    orderValue: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      const imagesArray = Array.from(files);
      setFormData((prevData) => ({ ...prevData, [name]: imagesArray }));
    } else {
      // If it's a regular input, update the state
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate order creation logic (fake API call)
    setTimeout(() => {
      // Simulate order creation success
      const orderId = "12345"; // Replace with the actual order ID
      const orderValue = "$100.00"; // Replace with the actual order value
      setOrderDetails({ orderId, orderValue });
      setModal(true);
    }, 1000); // Simulating a delay of 1 second for the API call
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <CContainer>
      <h3>Add New Staff Member</h3>
      <CForm onSubmit={handleSubmit}>
        <CRow>
          <CCol md="6">
            <CFormLabel htmlFor="StaffName" className="mt-4">
              Staff Name
            </CFormLabel>
            <CFormInput
              type="text"
              id="StaffName"
              name="StaffName"
              value={formData.StaffName}
              onChange={handleChange}
              required
            />
          </CCol>
          <CCol md="6">
            <CFormLabel htmlFor="StaffRank" className="mt-4">
              Staff Rank
            </CFormLabel>
            <CFormInput
              type="StaffRank"
              id="StaffRank"
              name="StaffRank"
              value={formData.StaffRank}
              onChange={handleChange}
              required
            />
          </CCol>
          <CCol md="6">
            <CFormLabel htmlFor="Salary" className="mt-4">
              Salary
            </CFormLabel>
            <CFormInput
              type="number"
              id="Salary"
              name="Salary"
              value={formData.Salary}
              onChange={handleChange}
              required
            />
          </CCol>

          <CCol md="6">
            <CFormLabel htmlFor="JoiningDate" className="mt-4">
              Joining Date
            </CFormLabel>
            <CFormInput
              type="date"
              id="JoiningDate"
              name="JoiningDate"
              value={formData.JoiningDate}
              onChange={handleChange}
              required
            />
          </CCol>

          <CCol md="12">
            <CFormLabel htmlFor="description" className="mt-4">
              is Salary
            </CFormLabel>
            <CFormCheck id="flexCheckDefault" label="Default checkbox" />
          </CCol>
          {/* Add other form fields similarly */}
        </CRow>
        <CRow>
          <div className="mb-3">
            <CFormLabel htmlFor="formFileMultiple">Photo</CFormLabel>
            <CFormInput
              type="file"
              id="formFileMultiple"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
        </CRow>
        <CButton color="primary" type="submit" className="mt-4 mb-4">
          Add Staff
        </CButton>
      </CForm>

      {/* Order Creation Status Modal */}
      <CModal show={modal} onClose={closeModal}>
        <CModalHeader closeButton>
          <CModalTitle>Order Creation Status</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Order ID: {orderDetails.orderId}</p>
          <p>Order Value: {orderDetails.orderValue}</p>
          {/* Add other order details here */}
        </CModalBody>
      </CModal>
    </CContainer>
  );
};

export default AddNewStaff;
