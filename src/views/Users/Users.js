// Users.js
import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Users = () => {
  const columnDefs = [
    { headerName: 'UserID', field: 'userId' },
    { headerName: 'UserName', field: 'userName' },
    { headerName: 'UserAddress', field: 'userAddress' },
    { headerName: 'TotalOrders', field: 'totalOrders' },
    { headerName: 'UserSince', field: 'userSince' },
  ];

  const rowData = [
    { userId: 1, userName: 'John Doe', userAddress: '123 Main St', totalOrders: 10, userSince: '2020-01-01' },
    { userId: 2, userName: 'Jane Smith', userAddress: '456 Oak St', totalOrders: 15, userSince: '2019-05-01' },
    // Add more user data as needed
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
      />
    </div>
  );
};

export default Users;
