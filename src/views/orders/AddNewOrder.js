import React, { useState } from "react";
import { useAtom } from "jotai"; // Import useAtom
import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,

  CRow,
} from "@coreui/react";

// Import the rowDataAtom
import { rowDataAtom } from "../../Context"; // Replace with the actual path

const AddNewOrder = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    itemCount: "",
    customerName: "",
    customerAddress: "",
    date: "",
    paymentMode: "",
    status: "",
  });


  // Use the rowDataAtom with useAtom
  const [rowData, setRowData] = useAtom(rowDataAtom);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new order object
    const newOrder = {
      orderId: rowData.length + 1, // Use a unique ID (you may need a better approach)
      date: formData.date,
      customerName: formData.customerName,
      itemsCount: parseInt(formData.itemCount, 10), // Assuming itemsCount is a number
      paymentMode: formData.paymentMode,
      status: formData.status,
      // Add other properties similarly
    };
    const updatedData = [...rowData, newOrder];

    // Save to local storage
    localStorage.setItem('rowData', JSON.stringify(updatedData));
  
    // Update the state
    setRowData(updatedData);
    // console.log(rowData)
  };

  return (
    <CContainer>
    <h3>Create New Order</h3>
      <CForm onSubmit={handleSubmit}>
        <CRow>
          <CCol md="6" >
            <CFormLabel htmlFor="itemName" className="mt-4">Item Name</CFormLabel>
            <CFormInput
              type="text"
              id="itemName"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
            />
          </CCol>
          <CCol md="6">
 
    <CFormLabel htmlFor="itemQuantity" className="mt-4">
      Item Quantity
    </CFormLabel>
    <CFormInput
      type="number"
      id="itemQuantity"
      name="itemCount"  // <-- Corrected the name to match the handleChange function
      value={formData.itemCount}
      onChange={handleChange}
      required
    />
  
</CCol>
          <CCol md="6">
            <CFormLabel htmlFor="date" className="mt-4">Date</CFormLabel>
            <CFormInput
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </CCol>

          <CCol md="6">
            <CFormLabel htmlFor="paymentMode" className="mt-4">Payment Mode</CFormLabel>
            <CFormInput
              type="text"
              id="paymentMode"
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
              required
            />
          </CCol>

          <CCol md="6">
            <CFormLabel htmlFor="status" className="mt-4">Status</CFormLabel>
            <CFormInput
              type="text"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            />
          </CCol>
          {/* Add other form fields similarly */}
        </CRow>
        <CRow>
          <CCol md="6">
            <CFormLabel htmlFor="CustomerName" className="mt-4">Customer Name</CFormLabel>
            <CFormInput
              type="text"
              id="CustomerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
            />
          </CCol>
          <CCol md="6">
            <CFormLabel htmlFor="CustomerAddress" className="mt-4">CustomerAddress</CFormLabel>
            <CFormInput
              type="text"
              id="CustomerAddress"
              name="customerAddress"
              value={formData.customerAddress}
              onChange={handleChange}
              required
            />
          </CCol>
          {/* Add other form fields similarly */}
        </CRow>
        <CButton color="primary" type="submit" className="mt-4 mb-4">
          Create Order
        </CButton>
      </CForm>

    </CContainer>
  );
};

export default AddNewOrder;
