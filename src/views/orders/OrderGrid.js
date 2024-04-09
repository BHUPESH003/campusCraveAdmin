import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; // Import Material theme
// import { getAllOrderLoadableAtom } from "src/Context";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { dataService } from "src/services/apiServices/dataService";
import { envKey } from "src/Url";
// import { CheckCircleFill, XCircleFill } from "react-bootstrap-icons"; // Import React Bootstrap icons

const OrderGrid = ({ statusFilter }) => {
  // const allOrders = useAtomValue(getAllOrderLoadableAtom);
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

  // Assuming you have useState and useEffect imported from React
  const verifyTokenAndProceedToCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Redirect to login page or display a message
        navigate("/login");
        return;
      }

      const response = await fetch(
        "http://localhost:3001/vendor/verify-token",
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
        `${envKey.BASE_URL}/vendor/vendorOrders/${vendorId}`
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

  const navigate = useNavigate();
  const onRowClicked = (event) => {
    const orderId = event.data.id;
    navigate(`/orders/details/${orderId}`);
  };

  // const handleAcceptOrder = (orderId) => {
  //   const orderIndex = rowData.findIndex((order) => order._id === orderId);
  //   if (orderIndex !== -1) {
  //     const updatedData = [...rowData];
  //     updatedData[orderIndex] = {
  //       ...updatedData[orderIndex],
  //       orderstatus: "Accepted",
  //       actionTaken: true,
  //     };
  //     setRowData(updatedData);
  //   }
  // };

  // const handleRejectOrder = (orderId) => {
  //   const orderIndex = rowData.findIndex((order) => order._id === orderId);
  //   if (orderIndex !== -1) {
  //     const updatedData = [...rowData];
  //     updatedData[orderIndex] = {
  //       ...updatedData[orderIndex],
  //       orderstatus: "Rejected",
  //       actionTaken: true,
  //     };
  //     setRowData(updatedData);
  //   }
  // };

  // const renderActionButtons = (params) => (
  //   <div>
  //     {!params.data.actionTaken && (
  //       <>
  //         <button onClick={() => handleRejectOrder(params.data._id)} className="button button-primary">
  //           <XCircleFill color="red" />
  //         </button>
  //         <button onClick={() => handleAcceptOrder(params.data._id)}>
  //           <CheckCircleFill color="green" />
  //         </button>
  //       </>
  //     )}
  //     <span>{params.data.orderstatus}</span>
  //   </div>
  // );

  const columnDefs = [
    // { headerName: "Serial No.", field: "index", sortable: true, filter: true },
    {
      headerName: "Order ID",
      field: "id",
      sortable: true,
      filter: true,
      pinned: "left",
    },
    {
      headerName: "Date",
      field: "createdAt",
      sortable: true,
      filter: true,
      valueFormatter: (params) => formatDate(params.data.created_at),
    },
    {
      headerName: "Customer Name",
      field: "username",
      sortable: true,
      filter: true,
    },
    // {
    //   headerName: "Items Count",
    //   field: "totalCountOfItems",
    //   valueGetter: (params) => totalItemsCounts[params.node.rowIndex],
    //   sortable: true,
    //   filter: true,
    // },
    {
      headerName: "Order Amount",
      field: "price",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Status",
      field: "payment_status",
      sortable: true,
      filter: true,
    },
    // {
    //   headerName: "Action",
    //   field: "category",
    //   cellRenderer: renderActionButtons,
    //   width: 120,
    // },
  ];

  // const extractTotalItemsCount = (order) => {
  //   let totalCount = 0;
  //   order.productIds.forEach((product) => {
  //     totalCount += product.quantityOrdered;
  //   });
  //   return totalCount;
  // };

  // const totalItemsCounts = rowData.map((order) =>
  //   extractTotalItemsCount(order)
  // );

  const formatDate = (dateString) => {
    if (!dateString || isNaN(new Date(dateString))) {
      return "Invalid date";
    }

    return dateString.slice(0, 19).replace("T", " "); // "YYYY-MM-DDTHH:mm:ss" -> "YYYY-MM-DD HH:mm:ss"
  };

  const filteredData = statusFilter
    ? rowData.filter((order) => order.status === statusFilter)
    : rowData;

  return (
    <div
      className="ag-theme-quartz-dark"
      style={{ height: 400, width: "100%" }}
    >
      <AgGridReact
        columnDefs={columnDefs}
        rowData={filteredData}
        onRowClicked={onRowClicked}
      />
    </div>
  );
};

OrderGrid.propTypes = {
  statusFilter: PropTypes.string,
};

export default OrderGrid;
