/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import "../main.css"

const Register = () => {
    const Navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [role, setRole] = useState("");
    const [phone, setPhone] = useState("");
    const [profilePic, setProfilePic] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
      };
    
      const handlePassword = (e) => {
        setPassword(e.target.value);
      };
    
      const handlePic = (e) => {
        setProfilePic(e.target.files[0]);
      };

      const handleSubmit = async () => {
        const payload = {
          email: email,
          password: password,
          passwordRepeat: passwordRepeat,
          name: name,
          phoneNumber: phone,
          profilePictureUrl: "",
          role: "admin",
        };
      
        let data = new FormData();
        data.append("img", profilePic );
      
        try {
          // Register user
          const registerResponse = await axios.post(
            'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/register',
            payload,
            { headers: { apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c' } }
          );
          console.log('Success:', registerResponse.data);
          Navigate('/login');
          
          // Upload image
          const uploadResponse = await axios.post(
            'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image',
            data,
            { headers: { apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c' } }
          );
          console.log('Upload success:', uploadResponse.data);
          payload.profilePictureUrl = uploadResponse?.data?.url;
        } catch (error) {
          if (error.response) {
            console.error('Server error:', error.response.data);
          } else if (error.request) {
            console.error('Network error:', error.request);
          } else {
            console.error('Error:', error.message);
          }
        }
      };
      

        return (
            <div className="container" style={{ marginTop: '10rem' }}>
                <div className="row d-flex align-items-center justify-content-center">
                <div className="col-lg-5 col-12">
                    <h1 className="fw-semibold" style={{ fontSize:"4vw" }}>Welcome to Reisen!</h1>
                    <p>Just a normal travel website, nothing weird :)</p>
                </div>
                <div className="col-lg-7 col-12">
                    <p className="fw-semibold fs-5">REGISTER</p>
                    <div className="mb-3">
                        <input
                            className="form-control"
                            onChange={handleEmail}
                            id="email"
                            placeholder="Email" required
                            type="email"
                            autoComplete="email"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                        onChange = {(e) => {
                            setName(e.target.value)
                        }}
                            className="form-control"
                            id="name"
                            placeholder="Name" required
                            type="text"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                        onChange = {(e) => {
                            setPhone(e.target.value)
                        }}
                            className="form-control"
                            id="phone"
                            placeholder="Phone Number" required
                            type="number"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            className="form-control"
                            onChange={handlePassword}
                            id="password"
                            placeholder="Password" required
                            type="password"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            className="form-control"
                            onChange={(e) => {
                                setPasswordRepeat(e.target.value)
                            }}
                            id="repeatPassword"
                            placeholder="Confirm Your Password" required
                            type="password"
                        />
                    </div>
                    <div className="mb-3">
                        <input className="form-control" type="file" id="formFile" onChange={handlePic}/>
                    </div>
                    <div className="form-check form-switch mb-3">
                        <input
                            onChange={(e) => {
                                setRole(e.target.value)
                            }}
                            className="form-check-input"
                            type="checkbox"
                            name="admin"
                            value="admin"
                            id="admin"
                        />
                        <label className="form-check-label" htmlFor="admin">
                            Admin
                        </label>
                    </div>
                    <button type="submit" className="btn px-5 mb-3 btn-custom" onClick={handleSubmit}>Register</button>
                    <Link className="text-decoration-none text-black" to="/login"><p>Already Have an Account? <b className="text-primary">Login Here</b></p></Link>
                  </div>
            </div>

        </div>
        )
}

export default Register;