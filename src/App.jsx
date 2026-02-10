import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, NavLink } from "react-router";
const { VITE_BASEURL, VITE_PATH } = import.meta.env;

function App() {
    const handleActiveLink = ({ isActive }) => {
        // console.log("isActive", isActive);
        return `h5 text-decoration-none mx-2 ${isActive ? "active" : ""}`;
    };

    const messageSlice = useSelector((state) => {
        console.log("state", state.message.totalCountInCart);
        return state.message;
    });
    return (
        <>
            <ul className="d-flex border list-unstyled p-2 bg-secondaryX text-lightX">
                <li>
                    <NavLink className={handleActiveLink} to="/">
                        Home
                    </NavLink>
                </li>{" "}
                |
                <li>
                    <NavLink className={handleActiveLink} to="/products">
                        Products
                    </NavLink>
                </li>{" "}
                |
                <li>
                    <NavLink className={handleActiveLink} to="/cart">
                        Cart [{messageSlice.totalCountInCart}]
                    </NavLink>
                </li>
                |
                <li>
                    <NavLink className={handleActiveLink} to="/login">
                        Login
                    </NavLink>
                </li>
                <li className="ms-auto">
                    <NavLink className={handleActiveLink} to="/login">
                        msg
                    </NavLink>
                </li>
                {/* <li>
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={async (e) => {
                            const res = await axios.post(`${VITE_BASEURL}/logout`);
                            console.log('logout', res)
                        }}
                    >
                        Login
                    </button>
                </li> */}
            </ul>
            <Outlet></Outlet>
        </>
    );
}

export default App;
