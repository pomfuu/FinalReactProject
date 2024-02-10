import { useEffect, useState } from 'react';
import { Card, Carousel, Button } from 'react-bootstrap'; // Import Button component
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import videoSrc from "../assets/travel.mp4";
import "../main.css"

function Home() {
    const navigate = useNavigate();
    const [data, getData] = useState([]);
    const [cat, setCat] = useState([]);
    const [act, setAct] = useState([]);

    const getPromos = () => {
        axios
            .get(
                `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos`,
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
            .then((res) => {
                const data = res?.data?.data;
                getData(data);
            })
            .catch((error) => {
                console.error("Error fetching:", error);
            });
    }

    const getActivities = () => {
        axios
            .get(
                `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities`,
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
            .then((res) => {
                const data = res?.data?.data;
                setAct(data);
            })
            .catch((error) => {
                console.error("Error fetching:", error);
            });
    };

    const getCat = () => {
        axios
            .get(
                `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories`,
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
            .then((res) => {
                const data = res?.data?.data;
                setCat(data);
            })
            .catch((error) => {
                console.error("Error fetching:", error);
            });
    };

    useEffect(() => {
        getActivities();
        getPromos();
        getCat();
    }, []);

    const StyledCard = styled(Card)`
      border: none !important;
    `;
    
    const StyledOverlay = styled.div`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5); /* Black overlay with opacity */
      opacity: 0; /* Initially hidden */
      transition: opacity 0.3s ease; /* Smooth transition on hover */
    `;
    
    const OverlayContent = styled.div`
      position: absolute;
    `;
    
    const StyledButton = styled(Button)`
      position: absolute;
      bottom: 7vw;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
      transition: opacity 0.3s ease;
    `;

    const BlackOverlay = styled.div`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5); 
      opacity: 1; 
      transition: opacity 0.3s ease; 
    `;

    function scrollToActivities(event) {
        event.preventDefault();
        const activitiesSection = document.getElementById('activities');
        activitiesSection.scrollIntoView({ behavior: 'smooth' });
    }

    function scrollToCat(event) {
      event.preventDefault();
      const activitiesSection = document.getElementById('categories');
      activitiesSection.scrollIntoView({ behavior: 'smooth' });
  }

    function scrollToPromo(event) {
      event.preventDefault();
      const activitiesSection = document.getElementById('promotions');
      activitiesSection.scrollIntoView({ behavior: 'smooth' });
  }

    return (
        <div>
            <Navbar />
            <div className="container-fluid overflow-hidden mtop-small">
                <div className="row">
                    <div className="row d-flex">
                        <div className="col-lg-5 col-12 mt-auto container" style={{ marginBottom: "4vw" }}>
                            <div className="px-5" style={{ fontSize: '3vw' }}>
                                <p className="btn text-white fs-4 px-5 py-2" style={{ backgroundColor: "#1e1e1e" }}>Navigate</p>
                                <hr /><Link to="#activities" onClick={scrollToCat} className="text-decoration-none hover-magnify">
                                    <span className="default-text-color">Categories</span>
                                    <span className="default-text-color hover-text-color" style={{ float: 'right' }}>&#8599;</span>
                                </Link>
                                <hr />
                                <Link to="#activities" onClick={scrollToActivities} className="text-decoration-none hover-magnify">
                                    <span className="default-text-color">Activities</span>
                                    <span className="default-text-color hover-text-color" style={{ float: 'right' }}>&#8599;</span>
                                </Link>
                                <hr />
                                <Link to="#activities" onClick={scrollToPromo} className="text-decoration-none hover-magnify">
                                    <span className="default-text-color">Promotions</span>
                                    <span className="default-text-color hover-text-color" style={{ float: 'right' }}>&#8599;</span>
                                </Link>
                                <hr />
                            </div>
                        </div>
                        <div className="col-lg-7 col-12 position-relative">
                            <div className="position-relative">
                                <video className="video-background object-fit-cover" style={{ objectFit: "cover", height: "49vw", width: "100vw", borderBottomLeftRadius: "1vw" }} autoPlay loop muted>
                                    <source src={videoSrc} type="video/mp4" />
                                </video>
                                <div className="position-absolute top-0 start-0  bg-black opacity-50 disnone" style={{ height: "99.5%", width: "105%", borderBottomLeftRadius: "1vw" }}></div>
                                <div className="position-absolute top-0 start-0  bg-black opacity-50 disnone" style={{ height: "99.5%", width: "105%", borderBottomLeftRadius: "1vw" }}></div>
                                <div className="position-absolute bottom-0 start-0 ps-5 text-white" style={{ zIndex: "2", lineHeight: "1.2", marginBottom: "4vw" }}>
                                    <p className="fs-5 mb-1">CONNECTING YOUR JOURNEY WITH PURPOSE</p>
                                    <p style={{ fontSize: "2.7vw" }} className="font2 mb-0">Unforgettable travel experiences with a <i>positive</i> impact </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="rounded-bottom-5 mt-5" style={{ paddingTop: "17vw", paddingBottom: "17vw", paddingLeft: "5vw", paddingRight: "5vw", backgroundColor: "#FFFFFC" }}>
                <div>
                    <p className="fs-3 mb-0 mb-small" style={{ lineHeight: "0.5vw" }}>WHY REISEN</p>
                    <p className="fw-semibold" style={{ fontSize: "5vw" }}>TRAVELLING TO GO HIGHER </p>
                    <hr style={{ borderColor: "#1e1e1e" }} />
                    <p className="fs-1">Sit back and Relax, Reisen will do the rest</p>
                    <p className="fs-1">A stress-free trip is our utmost goal.</p>
                </div>
            </section>

            <div className="container">

                {/* Category  */}
                <section id='categories' style={{ marginTop: "10vw" }}>
                    <div className="row align-items-center justify-content-center" style={{ overflowX: "hidden", whiteSpace: "nowrap" }}>
                        <div className="col-lg-4 col-12">
                          <p>CATEGORY</p>
                          <p className="fs-1 fw-semibold font2">Destination List</p>
                          <p>Browse our destination list and get in contact <br /> to start planning your own very adventure </p>
                        </div>
                        <div className="col-lg-8 col-12">
                        <Carousel
                            prevIcon={<span className="carousel-control-prev-icon" />}
                            nextIcon={<span className="carousel-control-next-icon" />}
                            className='rounded2'
                            indicators={false}
                        >
                            {cat.map((item, key) => (
                                <Carousel.Item className='rounded-3' key={key}>
                                    <div className="row flex-nowrap rounded-3">
                                        <div>
                                            <StyledCard className="rounded-3">
                                                <Card.Img
                                                    className="img-fluid rounded-3"
                                                    style={{ height: "30vw", objectFit: "cover", position: "relative" }}
                                                    src={item.imageUrl}
                                                />
                                                <BlackOverlay className='rounded-3'></BlackOverlay>
                                                <OverlayContent className='mb-4' style={{ marginLeft:"5vw" ,position: "absolute", bottom: 0}}>
                                                    <p className='mb-0 text-white disnone'>Explore the beauty of</p>
                                                    <p className='fs-2 fw-semibold text-white text-start' style={{ minHeight: "5rem" }}>
                                                        {item.name}
                                                    </p>
                                                </OverlayContent>
                                            </StyledCard>
                                        </div>
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>

                        </div>
                    </div>
                </section>


                {/* Promos */}
                <section id='promotions' style={{ marginTop: "13vw" }}>
                  <div className="text-center">
                    <p className='font2 fw-semibold mb-2' style={{ fontSize: "3vw" }}>Promotions</p>
                    <p className='btn btn-custom px-5 py-2 fs-5 rounded-5 mt-0 mb-5'>Limited Promotions Event</p>
                  </div>
                    <div className="row">
                        {data.map((item, key) => (
                            <div key={key} className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                <StyledCard style={{ width: "100%" }} className="hover-scale">
                                    <Card.Img className="img-fluid" style={{ height: "30vh", objectFit: "cover" }} variant="top" src={item.imageUrl} />
                                    <StyledOverlay></StyledOverlay>
                                    <Card.Body className='rounded-bottom-3'style={{ backgroundColor: "#FBFAF5"}} >
                                        <Card.Title className='fs-5 fw-semibold' style={{ minHeight: "3rem"}}>
                                            {item.title}
                                        </Card.Title>
                                        <Card.Text style={{ minHeight: "6vw"}}>{item.description}</Card.Text>
                                        <StyledButton onClick={() => navigate(`/promotion/${item.id}`)} variant="primary">Go somewhere</StyledButton>
                                    </Card.Body>
                                </StyledCard>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Activity  */}
                <section id="activities" style={{ marginTop: "10vw" }}>
                  <div className="col align-items-center d-flex">
                    <p className='font2 fs-1 fw-semibold'>ACTIVITY</p>
                    <p className='ms-auto'>Famous activities</p>
                  </div>
                    <div className="row d-flex">
                      <hr />
                        {act.map((item, key) => (
                            <div key={key} className="row mt-4 d-flex">
                              <div className="col-lg-4 col-12">
                              <Card.Img className="img-fluid rounded-start-4" style={{ height: "30vh", objectFit: "cover" }} variant="top" src={item?.category?.imageUrl} />
                              </div>
                              <div className="col-lg-8 col-12">
                                <p className='fs-2 fw-semibold'>{item.title}</p>
                                <p className='fs-5'>{item.description}</p>
                                <div className="col align-items-center d-flex">
                                  <Link to={(`/activities/${item.id}`)}  className="text-black ms-auto text-decoration-none fs-1 hover-act" style={{ float: 'right' }}>&#8599;</Link>
                                </div>
                              </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                <div className="container rounded-2" style={{marginTop:"15vw"}}>
                    <div className="row text-center" >
                        <div className="col-md-12">
                        <p className="fw-semibold" style={{ fontSize: '5vw' }}>
                            Contact Us
                        </p>
                        </div>
                        <div className="col align-items-center">
                        <a
                            href="https://web.whatsapp.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-custom px-3 rounded-5 mx-3 fs-5"
                        >Facebook</a>
                                                <a
                            href="https://web.whatsapp.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-custom px-3 rounded-5 mx-3 fs-5"
                        >Whatsapp</a>
                        <a
                            href="https://web.whatsapp.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-custom px-3 rounded-5 mx-3 fs-5"
                        >Instagram</a>
                        </div>
                    </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default Home;
