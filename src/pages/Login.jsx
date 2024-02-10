import axios from "axios"
// import { Checkbox, Label, TextInput } from "flowbite-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../main.css"

const Login = () => {
    const Navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const apiKey = "24405e01-fbc1-45a5-9f5a-be13afcd757c"
    
    const handleEmail = (e) => {
        setEmail(e.target.value)
        console.log(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
        console.log(e.target.value)
    }

    const handleSubmit = () => {
        const payload = {
            email: email,
            password: password,
        }
        const headers = {
            apiKey: apiKey,
            "content-Type": "application/json",
        }
        axios.post(
            "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login",
            payload,
            { headers: headers }
        )
        .then((res) => {
            localStorage.setItem("token", res?.data?.token)
            Navigate("/")
        })
        .catch((error) => {
            console.log(error);
        })
    };

    return (
        <div className="container" style={{ marginTop: '15vw' }}>
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-lg-5 col-12">
                    <h1 className="fw-semibold" style={{ fontSize:"4vw" }}>Welcome to Reisen!</h1>
                    <p>Just a normal travel website, nothing weird :)</p>
                </div>
                <div className="col-lg-7 col-12">
                    <p className="fw-semibold fs-5">LOGIN</p>
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
                            className="form-control"
                            onChange={handlePassword}
                            id="password"
                            placeholder="Password" required
                            type="password"
                        />
                    </div>
                    <div className="form-check mb-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="rememberMeCheckbox"
                        />
                        <label className="form-check-label" htmlFor="rememberMeCheckbox">
                            Remember me
                        </label>
                    </div>
                    <div className="mb-3">
                        <Link className="text-decoration-none text-black" to={"/register"}>No Account Yet? <b className="text-primary">Register here</b></Link>
                    </div>
                    <button type="submit" className="btn btn-custom px-5" onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login;
