import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ".././main.css"

const Navbars = () => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [showBackground, setShowBackground] = useState(false);
    const isLoggedIn = localStorage.getItem("token");

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            if (scrollTop > 250) { 
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
            setIsScrolled(true);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="text-center mx-auto">
            <Navbar expand="lg" className={`fixed-top ${isScrolled && showBackground ? 'rounded-3 text-center mx-auto mt-3 nav-small' : 'mt-3 bg-transparent rounded-3 text-center mx-auto'}`} style={{ backgroundColor:"#FBFAF5" ,transition: "background-color 0.5s ease", height: "3.5vw", width: "85%"}}>
                <Container>
                    <Navbar.Brand><Link to={"/dashboard"} className="text-decoration-none font2 fw-semibold fs-4 text-black">Reisen</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto justify-content-center align-items-center">
                            {isLoggedIn ? (
                                <Nav.Link onClick={handleLogout} className={`${isScrolled && showBackground ? 'text-black' : 'text-white'}`}>&#10006;</Nav.Link>
                            ) : (
                                <Nav.Link href={"/login"} className={` ${isScrolled && showBackground ? 'text-black' : 'text-white'}`}>Login</Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Navbars;
