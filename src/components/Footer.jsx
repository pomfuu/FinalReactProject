import { Col, Row } from "react-bootstrap";
import { Envelope, Github, Linkedin } from "react-bootstrap-icons";

const Footer = () => {
    return (
        <footer style={{ backgroundColor:'#1e1e1e', marginTop:"20vw" }}>
            <div className="container">
                <Row className="text-center">
                    <Col className="p-5" style={{ backgroundColor: '#1E1E1E' }}>
                        <a target="_blank" href="https://www.linkedin.com/in/clarien-cahyono-a60a0a277/" style={{ backgroundColor: '#1E1E1E' }} rel="noreferrer"><Linkedin className="fs-3 mx-4 text-white" style={{ backgroundColor: '#1E1E1E' }}></Linkedin></a>
                        <a target="_blank" href="https://github.com/pomfuu" style={{ backgroundColor: '#1E1E1E' }} rel="noreferrer"><Github className="fs-3 mx-4 text-white" href="https://github.com/pomfuu" style={{ backgroundColor: '#1E1E1E' }}></Github></a>
                        <a target="_blank" href="https://mail.google.com/mail/?view=cm&fs=1&to=alincahyono@gmail.com&su=SUBJECT&body=BODY" style={{ backgroundColor: '#1E1E1E' }} rel="noreferrer"><Envelope className="fs-3 mx-4 text-white" style={{ backgroundColor: '#1E1E1E' }}></Envelope></a>
                    </Col>
                </Row>
            </div>
        </footer>
    )
}

export default Footer;