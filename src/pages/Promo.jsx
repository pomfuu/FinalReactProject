import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import AddPromotions from "./AddPromotions";

const Promo = () => {
    const [promotions, setPromotions] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updatePromotion, setUpdatePromotion] = useState({});
    const [formTitle, setFormTitle] = useState("");
    const [formDescription, setFormDescription] = useState("");
    const [formTc, setFormTc] = useState("");
    const [formPromoCode, setFormPromoCode] = useState("");
    const [formDiscountPrice, setFormDiscountPrice] = useState(0);
    const [formMinClaimPrice, setFormMinClaimPrice] = useState(0);
    const [formFile, setFormFile] = useState(null);

    const getPromotions = async () => {
        try {
            const response = await axios.get(
                "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setPromotions(response?.data?.data || []);
        } catch (error) {
            console.error("Error fetching promotions:", error);
        }
    };

    useEffect(() => {
        getPromotions();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/${id}`,
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            getPromotions();
        } catch (error) {
            console.error("Error deleting promotion:", error);
        }
    };

    const handleUpdateModalShow = (promotion) => {
        setUpdatePromotion(promotion);
        setFormTitle(promotion.title);
        setFormDescription(promotion.description);
        setFormTc(promotion.terms_condition);
        setFormPromoCode(promotion.promo_code);
        setFormDiscountPrice(promotion.promo_discount_price);
        setFormMinClaimPrice(promotion.minimum_claim_price);
        setShowUpdateModal(true);
    };

    const handleUpdateModalClose = () => {
        setShowUpdateModal(false);
    };

    const handleUpdate = async () => {
        const payload = {
            title: formTitle,
            description: formDescription,
            terms_condition: formTc,
            promo_code: formPromoCode,
            promo_discount_price: formDiscountPrice,
            minimum_claim_price: formMinClaimPrice,
            imageUrl: updatePromotion.imageUrl,
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
                `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${updatePromotion.id}`,
                payload,
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            getPromotions();
            handleUpdateModalClose();
        } catch (error) {
            console.error("Error updating promotion:", error);
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
                    <p className="fw-semibold mb-4 mt-5 fs-4">Promotions</p>
                        <div className="row mt-4">
                            <AddPromotions />
                            {promotions.map((promotion) => (
                                <div key={promotion.id} className="mt-4 col-lg-3 col-md-4 col-sm-6 mb-3">
                                    <Card.Img className="img-fluid rounded-2" style={{ height: "20vh", objectFit: "cover" }} variant="top" src={promotion.imageUrl} />
                                    <Card.Body>
                                        <Card.Title style={{ minHeight: "3rem" }}>
                                            {promotion.title}
                                        </Card.Title>
                                        <Card.Text style={{ minHeight: "9vw" }}> {promotion.description} </Card.Text>
                                        <Card.Text style={{ minHeight: "5vw" }}> TC: {promotion.terms_condition} </Card.Text>
                                        <Card.Text style={{ minHeight: "1vw" }}> Promo Code: {promotion.promo_code} </Card.Text>
                                        <Card.Text style={{ minHeight: "1vw" }}> Discount: {promotion.promo_discount_price} </Card.Text>
                                        <Card.Text style={{ minHeight: "1vw" }}> Claim Price: {promotion.minimum_claim_price} </Card.Text>
                                        <Button variant="primary" onClick={() => handleUpdateModalShow(promotion)}>Edit</Button>
                                        <Button onClick={() => handleDelete(promotion.id)} className="ms-2" variant="danger">Delete</Button>
                                    </Card.Body>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
            <Modal show={showUpdateModal} onHide={handleUpdateModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Promotion</Modal.Title>
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
                        <label htmlFor="tc" className="form-label">Terms and Condition</label>
                        <input type="text" className="form-control" id="tc" value={formTc} onChange={(e) => setFormTc(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="promoCode" className="form-label">Promo Code</label>
                        <input type="text" className="form-control" id="promoCode" value={formPromoCode} onChange={(e) => setFormPromoCode(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="discountPrice" className="form-label">Discount Price</label>
                        <input inputMode="numeric" type="number" className="form-control" id="discountPrice" value={formDiscountPrice} onChange={(e) => setFormDiscountPrice(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="minClaimPrice" className="form-label">Minimum Claim Price</label>
                        <input inputMode="numeric" type="number" className="form-control" id="minClaimPrice" value={formMinClaimPrice} onChange={(e) => setFormMinClaimPrice(e.target.value)} />
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

export default Promo;
