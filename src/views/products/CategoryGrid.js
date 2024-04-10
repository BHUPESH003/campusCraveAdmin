import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; // Import Material theme
import { useNavigate } from "react-router-dom";
import { envKey } from "src/Url";


const CategoryGrid = () => {
  
  const [rowData, setRowData] = useState([]);
  
  // useEffect(() => {
  //   if (allOrders.state === "hasData") {
  //     const ordersWithIndex = allOrders.data.map((order, index) => ({
  //       ...order,
  //       index: index + 1,
  //       actionTaken: false, // Initially, no action is taken on any order
  //     }));
  //     setRowData(ordersWithIndex);
  //   }
  // }, [allOrders.state]);
  const verifyTokenAndProceedToCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Redirect to login page or display a message
        navigate("/login");
        return;
      }

      const response = await fetch(
        `https://campuscrave-backend.onrender.com/vendor/verify-token` ,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        // Handle unauthorized access or invalid token
        // Redirect to login page or display a message
        return;
      }
      const { vendorId } = await response.json();
      console.log({ vendorId });
      // console.log("here")
      fetchData(vendorId);
      // makePayment(userName);
    } catch (error) {
      console.error("Error verifying token and proceeding to checkout:", error);
    }
  };

  const fetchData = async (vendorId) => {
    console.log("Fetching", vendorId);
    try {
      // Fetch orders for a specific vendor (replace 'vendorId' with the actual vendor ID)
      // const vendorId = 6; // Replace 'vendorId' with the actual vendor ID

      const response = await fetch(
        `${envKey.BASE_URL}/vendor/${vendorId}/categories`
      );
      const data = await response.json();

      setRowData(data); // Update state with fetched orders data
      console.log(data); // Log the fetched orders data
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  useEffect(() => {
    // Assuming you want to fetch orders when the component mounts
    verifyTokenAndProceedToCheckout();

    // Call the fetchData function
  }, []); // Empty dependency array to fetch data only once when the component mounts
  // Empty dependency array to fetch data only once when the component mounts


  console.log(rowData);
  const navigate = useNavigate();
  const onRowClicked = (event) => {
    const orderId = event.data._id;
    navigate(`/products/details/${orderId}`);
  };

  const columnDefs = [
    // { headerName: "Serial No.", field: "index", sortable: true, filter: true },
    {
      headerName: "Category Id",
      field: "id",
      sortable: true,
      filter: true,
      pinned: "left",
    },
    {
      headerName: "Category Name",
      field: "category_name",
      sortable: true,
      filter: true,
      //   valueFormatter: (params) => formatDate(params.value),
    },
 
   
  ];

  return (
    <div
      className="ag-theme-quartz-dark"
      style={{ height: 400, width: "100%" }}
    >
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        onRowClicked={onRowClicked}
      />
    </div>
  );
};

export default CategoryGrid;
