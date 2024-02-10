import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import AddActivity from "./AddActivity";

const Activity = () => {
    const [activity, setActivity] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateActivity, setUpdateActivity] = useState({});
    const [formTitle, setFormTitle] = useState("");
    const [formDescription, setFormDescription] = useState("");
    const [formPrice, setFormPrice] = useState(0);
    const [formLocation, setFormLocation] = useState("");
    const [formAddress, setFormAddress] = useState("");
    const [formFile, setFormFile] = useState(null);

    const getActivity = async () => {
        try {
            const response = await axios.get(
                "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities",
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setActivity(response?.data?.data || []);
        } catch (error) {
            console.error("Error fetching activity:", error);
        }
    };

    useEffect(() => {
        getActivity();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-activity/${id}`,
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            getActivity();
        } catch (error) {
            console.error("Error deleting acitivty:", error);
        }
    };

    const handleUpdateModalShow = (activity) => {
        setUpdateActivity(activity);
        setFormTitle(activity.title);
        setFormDescription(activity.description);
        setFormPrice(activity.price);
        setFormLocation(activity.province);
        setFormAddress(activity.address);
        setShowUpdateModal(true);
    };

    const handleUpdateModalClose = () => {
        setShowUpdateModal(false);
    };

    const handleUpdate = async () => {
        const payload = {
            title: formTitle,
            description: formDescription,
            price: formPrice,
            province: formLocation,
            address: formAddress,
            imageUrl: updateActivity.imageUrl,
        };

        if (formFile) {
            let formData = new FormData();
            formData.append("image", formFile);
            
            try {
                const response = await axios.post(
                    "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
                    formData,
                    {
                        headers: {
                            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                payload.imageUrl = response.data.url;
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }

        try {
            await axios.post(
                `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${updateActivity.id}`,
                payload,
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            getActivity();
            handleUpdateModalClose();
        } catch (error) {
            console.error("Error updating acitivty:", error);
        }
    };

    const handleFileChange = (e) => {
        setFormFile(e.target.files[0]);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar />
                <div className="col-10" style={{ paddingLeft: "20vw" }}>
                    <section>
                    <p className="fw-semibold mb-4 mt-5 fs-4">Activities</p>
                        <div className="row">
                            <AddActivity />
                            {activity.map((item) => (
                                <div key={item.id} className="mt-4 col-lg-3 col-md-4 col-sm-6 mb-3">
                                    <Card.Img className="img-fluid rounded-2 mb-1" style={{ height: "20vh", objectFit: "cover" }} variant="top" src={item?.category?.imageUrl} />
                                    <Card.Body>
                                        <Card.Title style={{ minHeight: "3rem" }}>
                                            {item.title}
                                        </Card.Title>
                                        <Card.Text>{item.description}</Card.Text>
                                        <Card.Text>Location: {item.province}</Card.Text>
                                        <Card.Text>Price: {item.price}</Card.Text>
                                        <Card.Text>Address: {item.address}</Card.Text>
                                        <Button variant="primary" onClick={() => handleUpdateModalShow(item)}>Edit</Button>
                                        <Button onClick={() => handleDelete(item.id)} className="ms-2" variant="danger">Delete</Button>
                                    </Card.Body>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
            <Modal show={showUpdateModal} onHide={handleUpdateModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Activty</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" value={formDescription} onChange={(e) => setFormDescription(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tc" className="form-label">Price</label>
                        <input inputMode="numeric" type="number" className="form-control" id="tc" value={formPrice} onChange={(e) => setFormPrice(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="promoCode" className="form-label">Location</label>
                        <input type="text" className="form-control" id="promoCode" value={formLocation} onChange={(e) => setFormLocation(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="promoCode" className="form-label">Address</label>
                        <input type="text" className="form-control" id="promoCode" value={formAddress} onChange={(e) => setFormAddress(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="file" className="form-label">Image</label>
                        <input type="file" className="form-control" id="file" onChange={handleFileChange} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleUpdateModalClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Activity;
