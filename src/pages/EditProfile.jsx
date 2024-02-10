/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const EditProfile = () => {
    const [data, getData] = useState({
        profilePictureUrl: "",
        name: "",
        email: "",
        phoneNumber: "",
        role: ""
    });

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
    });

    const [editMode, setEditMode] = useState(false);

    const getProfile = () => {
        axios
        .get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user`, {
            headers: {
                apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then((res) => {
            const userData = res?.data?.data;
            getData(userData);
            setFormData({
                name: userData.name,
                email: userData.email,
                phoneNumber: userData.phoneNumber,
            });
        });
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        axios
        .put(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile`, formData, {
            headers: {
                apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then((res) => {
            console.log("Profile updated successfully");
            setEditMode(false);
            getProfile();
        })
        .catch((error) => {
            console.error("Error updating profile:", error);
        });
    };

    useEffect(() => {
        getProfile();
    }, []);

    return(
        <div className="container-fluid">
            <div className="row">
                <Sidebar />
                <div className="col-10" style={{ paddingLeft: "20vw" }}>
                <p className="fw-semibold mb-4 mt-5 fs-4">Your Profile</p>
                    <img src={data.profilePictureUrl} className="img-fluid rounded-5" style={{ height:"20vw" }} alt="" />
                    {editMode ? (
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                            <button onClick={handleSubmit}>Save</button>
                        </div>
                    ) : (
                        <div className="fs-5 mt-4">
                            <p>Name         : {data.name}</p>
                            <p>Email        : {data.email}</p>
                            <p>Phone Number :{data.phoneNumber}</p>
                            <button className="btn btn-primary" onClick={() => setEditMode(true)}>Edit Profile</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EditProfile;
