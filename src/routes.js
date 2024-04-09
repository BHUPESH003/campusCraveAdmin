import React, { lazy } from 'react';

const Users = lazy(() => import('./views/Users/Users'));

const Login = lazy(() => import('./views/pages/login/Login'));
const AllOrders = lazy(() => import('./views/orders/AllOrders'));
const AddNewOrder = lazy(() => import('./views/orders/AddNewOrder'));
const Abandoned = lazy(() => import('./views/orders/Abandoned'));
const OrderDetails = lazy(() => import('./views/orders/OrderDetails'));

const Allproducts = lazy(() => import('./views/products/Allproducts'));
const Category = lazy(() => import('./views/products/Category'));
const AddNewProduct = lazy(() => import('./views/products/AddNew'));
const Inventory = lazy(() => import('./views/stocks/Inventory'));
const AddNewCategory = lazy(() => import('./views/products/AddNewCategory'));
// const AddNewCategory =lazy(()=> import ('./views/products/AddNewCategory'))


const Sales = lazy(() => import('./views/Analytics/Sales'));
const Traffic = lazy(() => import('./views/Analytics/Traffic'));
const Product = lazy(() => import('./views/Analytics/Product'));

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ProductDetails = React.lazy(() => import('./views/products/EditProduct'))



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  { path: '/orders', name: 'Orders', element: AllOrders, exact: true },
  { path: '/orders/add/new', name: 'Add Order', element: AddNewOrder, exact: true },
  { path: '/orders/abondened', name: 'Abondened', element: Abandoned },
  { path: '/orders/details/:id', name: 'Abondened', element: OrderDetails },

  { path: '/products', name: 'Products', element: Allproducts },
  { path: '/products/categories', name: 'Categories', element: Category },
  { path: '/products/add/new', name: 'AddNew', element: AddNewProduct },
  { path: '/categories/add/new', name: 'AddNew', element: AddNewCategory },
  { path: '/products/details/:id', name: 'AddNew', element: ProductDetails },
  { path: '/stocks/inventory', name: 'Inventory', element: Inventory },

  { path: '/analytics', name: 'Analytics', element: Sales },
  { path: '/analytics/traffic', name: 'Traffic', element: Traffic },
  { path: '/analytics/products', name: 'Products', element: Product },

  { path: '/login', name: 'Login', element: Login },
{ path: '/users', name: 'Users', element: Users },

 







  
]

export default routes
