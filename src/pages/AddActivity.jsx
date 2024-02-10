import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Dropdown, DropdownButton, Modal } from "react-bootstrap";

const AddActivity = () => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("");
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState(0);
    const [imageUrl] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState([]);

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
        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice)) {
            console.error("Invalid number format for price");
            return;
        }
        const payload = {
            title: title,
            description: description,
            address: address,
            price: price,
            province: location,
            imageUrl: imageUrl,
            category: category // Assign selected category to the activity
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
                "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-activity",
                payload,
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            console.log("Activity created:", response.data);
        } catch (error) {
            console.error("Error creating Activity:", error);
        }
        closeModal();
    };

    // Fetch categories from the API
    useEffect(() => {
        const fetchCategories = async () => {
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
        fetchCategories();
    }, []);

    return (
        <div>
            <button className="btn btn-primary" onClick={openModal}>Add Activity</button>
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Activity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Activity Name</label>
                        <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <DropdownButton id="dropdown-basic-button" title={category ? category : "Select Category"}>
    {categories.map((cat) => (
        <Dropdown.Item key={cat.id} onSelect={() => setCategory(cat.name)}>{cat.name}</Dropdown.Item>
    ))}
</DropdownButton>

                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input inputMode="numeric" type="number" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Location</label>
                        <input type="text" className="form-control" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="file" className="form-label">Image</label>
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

export default AddActivity;
