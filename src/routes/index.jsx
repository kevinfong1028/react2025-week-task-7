import { createBrowserRouter, Navigate } from 'react-router';
import App from "../App";
import Home from "@/pages/Home";
import Product from "@/pages/Product";
import Products from "@/pages/Products";
import Cart from "@/pages/Cart";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import AdminOrder from "@/pages/admin/AdminOrder";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminProducts from "@/pages/admin/AdminProducts";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                // path: "/",
                index: true,
                element: <Home />,
            },
            {
                path: "/Login",
                element: <Login />,
            },
            {
                path: "/Cart",
                element: <Cart />,
            },
            {
                path: "/products/",
                element: <Products />,
            },
            {
                path: "/product/:id",
                element: <Product />,
            },
        ],
    },
    {
        path: 'admin',
        element: <AdminLayout />,
        children: [
            { 
                path: 'products', 
                element: <AdminProducts /> 
            },
            { 
                path: 'order', 
                element: <AdminOrder /> 
            },
        ]
    },
    {
        path: "*",
        element: <NotFound />,
    },
];

export default routes;
