import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const AddPromotions = () => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("")
    const [tc, setTc] = useState("")
    const [promoCode, setPromoCode] = useState("")
    const [discountPrice, setDiscountPrice] = useState(0);
    const [minClaimPrice, setMinClaimPrice] = useState(0);
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
        const parsedDiscountPrice = parseFloat(discountPrice);
        const parsedMinClaimPrice = parseFloat(minClaimPrice);
        if (isNaN(parsedDiscountPrice) || isNaN(parsedMinClaimPrice)) {
            console.error("Invalid number format for discount price or minimum claim price");
            return;
        }
        const payload = {
            title: title,
            description: description,
            terms_condition: tc,
            promo_code: promoCode,
            promo_discount_price: parsedDiscountPrice,
            minimum_claim_price: parsedMinClaimPrice,
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
                "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-promo",
                payload,
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            console.log("Promotion created:", response.data);
        } catch (error) {
            console.error("Error creating promotion:", error);
        }
        closeModal();
    };

    return (
        <div>
            <button className="btn btn-primary" onClick={openModal}>Add Promotion</button>
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Promotion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {/* const [tc, setTc] = useState("")
                const [promoCode, setPromoCode] = useState("")
                const [discountPrice, setDiscountPrice] = useState("")
                const [minClaimPrice, setMinClaimPrice] = useState("") */}
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Promotion Name</label>
                        <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tc" className="form-label">Terms and Condition</label>
                        <input type="text" className="form-control" id="tc" value={tc} onChange={(e) => setTc(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="promoCode" className="form-label">Promo Code</label>
                        <input type="text" className="form-control" id="promoCode" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="discountPrice" className="form-label">Discount Price</label>
                        <input inputMode="numeric" type="number" className="form-control" id="discountPrice" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="minClaimPrice" className="form-label">Minimum Claim Price</label>
                        <input inputMode="numeric" type="number" className="form-control" id="minClaimPrice" value={minClaimPrice} onChange={(e) => setMinClaimPrice(e.target.value)} />
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

export default AddPromotions;
