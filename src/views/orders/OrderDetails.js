// OrderDetails.js
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { CContainer, CRow, CCol, CButton } from "@coreui/react";
import { useReactToPrint } from "react-to-print";
import { envKey } from "src/Url";

const OrderDetails = () => {
  const { id } = useParams();
  const componentRef = useRef();

  // Fetch orderDetails details using the orderDetails ID (id)
  // Placeholder: Replace this with actual data fetching logic
  // const orderDetails = {
  //   orderId: id,
  //   itemName: 'Sample Item',
  //   itemValue: '$50.00',
  //   customerDetails: { name: 'John Doe', address: '123 Main St, City' },
  //   shipmentDetails: { /* ... */ },
  //   paymentDetails: { /* ... */ },
  //   refundDetails: { /* ... */ },
  //   // Add more details as needed
  // };
  console.log(id);
  const [orderDetails, setorderDetails] = useState();
  useEffect(() => {
    // Assuming you want to fetch orders when the component mounts
    const fetchData = async () => {
      try {
        // Fetch orders for a specific vendor (replace 'vendorId' with the actual vendor ID)

        const response = await fetch(
          `${envKey.BASE_URL}/vendor/vendorOrders/orderDetails/${id}`
        );
        const data = await response.json();

        setorderDetails(data); // Update state with fetched orders data
        console.log("data"  , data); // Log the fetched orders data
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData(); // Call the fetchData function
  }, [id]);
  console.log("Order details state:", orderDetails); // Log orderDetails state

  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <CContainer>
      {orderDetails ? (<CRow>
        <CCol>
          <div className="container">
            <div className="row">
              <div className="col">
                <h2>Order Details</h2>
                <p>
                  <strong>Order ID:</strong> {orderDetails.id}
                </p>
                <p>
                  <strong>Order Time:</strong> {orderDetails.order_time}
                </p>
                <p>
                  <strong>Food Ready Time:</strong>{" "}
                  {orderDetails.food_ready_time}
                </p>
                <p>
                  <strong>Price:</strong> ${orderDetails.price}
                </p>
                <p>
                  <strong>Comment:</strong> {orderDetails.comment}
                </p>
                <p>
                  <strong>Vendor ID:</strong> {orderDetails.vendor_id}
                </p>
                <p>
                  <strong>Created At:</strong> {orderDetails.created_at}
                </p>
                <p>
                  <strong>Payment ID:</strong> {orderDetails.payment_id}
                </p>
                <p>
                  <strong>Payment Status:</strong> {orderDetails.payment_status}
                </p>
                <p>
                  <strong>Username:</strong> {orderDetails.username}
                </p>
                <h3>Items:</h3>
                <ul className="list-group">
                  {orderDetails.items.map((item, index) => (
                    <li key={index} className="list-group-item">
                      <p>
                        <strong>Item ID:</strong> {item.item_id}
                      </p>
                      <p>
                        <strong>Item Name:</strong> {item.item_name}
                      </p>
                      <p>
                        <strong>Item Price:</strong> ${item.item_price}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <CButton color="primary" onClick={handlePrint} className="mt-3">
            Download as PDF
          </CButton>
        </CCol>
      </CRow>) : (<p>Loading...</p>)}
      {/* Add a reference to the component for printing */}
      <div style={{ display: "none" }}>
      
        <div className="container" ref={componentRef}>
          {orderDetails && (<div className="row">
            <div className="col">
              <h2>Order Details</h2>
              <p>
                <strong>Order ID:</strong> {orderDetails.id}
              </p>
              <p>
                <strong>Order Time:</strong> {orderDetails.order_time}
              </p>
              <p>
                <strong>Food Ready Time:</strong> {orderDetails.food_ready_time}
              </p>
              <p>
                <strong>Price:</strong> ${orderDetails.price}
              </p>
              <p>
                <strong>Comment:</strong> {orderDetails.comment}
              </p>
              <p>
                <strong>Vendor ID:</strong> {orderDetails.vendor_id}
              </p>
              <p>
                <strong>Created At:</strong> {orderDetails.created_at}
              </p>
              <p>
                <strong>Payment ID:</strong> {orderDetails.payment_id}
              </p>
              <p>
                <strong>Payment Status:</strong> {orderDetails.payment_status}
              </p>
              <p>
                <strong>Username:</strong> {orderDetails.username}
              </p>
              <h3>Items:</h3>
              <ul className="list-group">
                {orderDetails.items.map((item, index) => (
                  <li key={index} className="list-group-item">
                    <p>
                      <strong>Item ID:</strong> {item.item_id}
                    </p>
                    <p>
                      <strong>Item Name:</strong> {item.item_name}
                    </p>
                    <p>
                      <strong>Item Price:</strong> ${item.item_price}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {item.quantity}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>)}
        </div>
      </div>
    </CContainer>
  );
};

export default OrderDetails;
