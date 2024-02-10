import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import AddCategory from "./addCategory";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateCategory, setUpdateCategory] = useState({});
    const [formName, setFormName] = useState("");
    const [formFile, setFormFile] = useState(null);

    const getCategories = async () => {
        try {
            const response = await axios.get(
                "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setCategories(response?.data?.data || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-category/${id}`,
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            getCategories();
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    const handleUpdateModalShow = (category) => {
        setUpdateCategory(category);
        setFormName(category.name);
        setShowUpdateModal(true);
    };

    const handleUpdateModalClose = () => {
        setFormName("");
        setShowUpdateModal(false);
    };

    const handleUpdate = async () => {
        const payload = {
            name: formName,
            imageUrl: updateCategory.imageUrl,
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
                `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-category/${updateCategory.id}`,
                payload,
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            getCategories();
            handleUpdateModalClose();
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar />
                <div className="col-10" style={{ paddingLeft: "20vw" }}>
                    <section>
                    <p className="fw-semibold mb-4 mt-5 fs-4">Categories</p>
                        <div className="row">
                            <AddCategory />
                            {categories.map((category) => (
                                <div key={category.id} className="mt-4 col-lg-3 col-md-5 col-sm-6 mb-5">
                                    <Card.Img className="rounded-2 img-fluid" style={{ height: "20vh", objectFit: "cover" }} variant="top" src={category.imageUrl} />
                                    <Card.Body>
                                        <Card.Title style={{ minHeight: "3rem" }}>
                                            {category.name}
                                        </Card.Title>
                                        <Button variant="primary" onClick={() => handleUpdateModalShow(category)}>Edit</Button>
                                        <Button onClick={() => handleDelete(category.id)} className="ms-2" variant="danger">Delete</Button>
                                    </Card.Body>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
            <Modal show={showUpdateModal} onHide={handleUpdateModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="categoryName" className="form-label">Category Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="categoryName"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="categoryImage" className="form-label">Category Image</label>
                        <input
                            type="file"
                            className="form-control"
                            id="categoryImage"
                            onChange={(e) => setFormFile(e.target.files[0])}
                        />
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

export default Category;
