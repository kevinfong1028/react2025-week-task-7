import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, NavLink } from "react-router";
const { VITE_BASEURL, VITE_PATH } = import.meta.env;

function AdminLayout() {
    //  console.log('AdminLayout 已渲染')
    const handleActiveLink = ({ isActive }) => {
        // console.log("isActive", isActive);
        return `h5 text-decoration-none mx-2 ${isActive ? "active" : ""}`;
    };

    const cartInfo = useSelector((state) => {
        // console.log("state", state.message.totalCountInCart);
        return state.message;
    });
    return (
        <>
            <ul className="d-flex border list-unstyled p-2 bg-secondaryX text-lightX">
                <li>
                    <NavLink className={handleActiveLink} to="/admin/order">
                        訂單管理
                    </NavLink>
                </li>
                |
                <li>
                    <NavLink className={handleActiveLink} to="/admin/products">
                        商品管理
                    </NavLink>
                </li>
                <li className="ms-auto">
                    <NavLink className={handleActiveLink} to="/login">
                        msg
                    </NavLink>
                </li>
            </ul>
            <Outlet></Outlet>
        </>
    );
}

export default AdminLayout;
