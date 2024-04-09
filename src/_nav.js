import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilInbox,
  cilNotes,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },

  {
    component: CNavTitle,
    name: "Components",
  },
  {
    component: CNavGroup,
    name: "Orders",
    to: "/orders",
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "All Orders",
        to: "/orders",
      },
      {
        component: CNavItem,
        name: "Abondend",
        to: "/orders/abondened",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Products",
    to: "/products",
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "All products",
        to: "/products",
      },
      {
        component: CNavItem,
        name: "Categories",
        to: "/products/categories",
      },
    ],
  },

  // {
  //   component: CNavItem,
  //   name: "Inventory",
  //   to: "/inventory",
  //   icon: <CIcon icon={cilInbox} customClassName="nav-icon" />,
  //   badge: {
  //     color: "info",
  //     text: "NEW",
  //   },
  // },

  // {
  //   component: CNavGroup,
  //   name: "Analytics",
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: "Sales",
  //       to: "/analytics",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Traffic",
  //       to: "/analytics/traffic",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Products",
  //       to: "/analytics/products",
  //     },
  //   ],
  // },

  // {
  //   component: CNavItem,
  //   name: "Login",
  //   to: "/login",
  //   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  // },
];

export default _nav;
