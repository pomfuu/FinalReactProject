/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom"

const Authorization = ({ children }) => {
    const token = localStorage.getItem("token")
    if( !token || token === "undefined"){
        return <Navigate to={"/login"}/>
    }
    return <div> { children || <Outlet />} </div>
}

export default Authorization;
