import React from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; // Import Material theme
import { useNavigate } from "react-router-dom";
import { CContainer } from "@coreui/react";
import { useAtomValue } from "jotai";
import { rowDataAtom } from "src/Context";
function Abandoned() {
  const navigate = useNavigate();
  const rowDataAtomValue = useAtomValue(rowDataAtom);
  const storedData = localStorage.getItem("rowData");
  const rowData = storedData ? JSON.parse(storedData) : [rowDataAtomValue];

  const onRowClicked = (event) => {
    const orderId = event.data.orderId;
    navigate(`/orders/details/${orderId}`);
  };
  const columnDefs = [
    { headerName: "Order ID", field: "orderId", sortable: true, filter: true },
    { headerName: "Date", field: "date", sortable: true, filter: true },
    {
      headerName: "Customer Name",
      field: "customerName",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Items Count",
      field: "itemsCount",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Payment Mode",
      field: "paymentMode",
      sortable: true,
      filter: true,
    },
    { headerName: "Status", field: "status", sortable: true, filter: true },
  ];

  // Filter orders with status "Abandoned"
  const abandonedOrders = rowData.filter(
    (order) => order.status === "Rejected"
  );

  return (
    <CContainer>
      <h3>Abandoned Orders</h3>
      <div className="ag-theme-material" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={abandonedOrders}
          onRowClicked={onRowClicked}
        />
      </div>
    </CContainer>
  );
}

export default Abandoned;
