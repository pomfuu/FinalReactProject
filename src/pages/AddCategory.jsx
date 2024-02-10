import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const AddCategory = () => {
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);
    const [imageUrl] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSaveChanges = async () => {
        const payload = {
            name: name,
            imageUrl: imageUrl,
        };

        if (file) {
            let formData = new FormData();
            formData.append("image", file);

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
            const response = await axios.post(
                "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-category",
                payload,
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            console.log("Category created:", response.data);
        } catch (error) {
            console.error("Error creating category:", error);
        }
        closeModal();
    };

    return (
        <div>
            <button className="btn btn-primary" onClick={openModal}>Add Category</button>
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Category Name</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="file" className="form-label">Category Image</label>
                        <input type="file" className="form-control" id="file" onChange={handleFileChange} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                    <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddCategory;
