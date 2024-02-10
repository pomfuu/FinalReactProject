/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ".././main.css"

const Sidebar = () => {
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);
    const menu = [
        {
            name: "Profile",
            value: "/profile"
        },
        {
            name: "Admin Dashboard",
            value: "/dashboard"
        },
        {
            name: "Categories",
            value: "/categories"
        },
        {
            name: "Promotions",
            value: "/promotion"
        },
        {
            name: "Activities",
            value: "/activities"
        },
        {
            name: "Logout",
            value: "/login"
        },
    ];

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const closeSidebar = () => {
        setShowSidebar(false);
    };

    return (
        <>
            <p
                className="d-lg-none"
                onClick={toggleSidebar}
            >
                {showSidebar ? "Close Sidebar" : "☰"}
            </p>
            <div
                className={`position-fixed top-0 bottom-0 rounded-end-4 start-0 vh-100% ${
                    showSidebar ? "col-6" : "col-2"
                } ${showSidebar ? "d-block" : "d-none"} d-lg-block`}
                style={{ backgroundColor:"#fffffc" }}
            >
                <p
                    className="position-absolute top-0 end-0 m-2"
                    onClick={closeSidebar}
                >
                    
                </p>
                <div className="m-5">
                <Link className="font2 text-decoration-none fs-4 fw-semibold text-black" to={"/dashboard"}>Reisen Admin</Link>
                <nav className="nav mt-5 flex-column">
                    {menu.map((value, index) => (
                        <Link
                            to={value.value}
                            key={index}
                            className={`${value.value.includes(
                                location.pathname
                            ) ? "bg-black rounded-2 px-4 py-2 text-decoration-none fs-5 mb-4 text-white" : "text-decoration-none fs-5 text-black mb-4"}`}
                        >
                            <div>{value.name}</div>
                        </Link>
                    ))}
                    <Link to={"/"} className="btn btn-custom" style={{ marginTop:"20vw" }}>Back to Home</Link>
                </nav>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
