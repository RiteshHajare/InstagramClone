import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



function Register() {
    let navigate = useNavigate();
    const [creds, setCreds] = useState({
        email: "",
        username: "",
        password: ""
    });
    const [err, setErr] = useState("");
    const [isRegistered, setRegistered] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;
        setCreds(prevValues => {
            return { ...prevValues, [name]: value }
        });
        setErr("");
    }
    function handleClick() {
        axios.post("http://localhost:4500/register", creds)
            .then(function (response) {
                setErr(response.data.message);
                console.log(response.data);
                setRegistered(response.data);
            });
        setCreds(() => {
            return {
                email: "",
                username: "",
                password: ""
            }
        });

    }

    useEffect(() => {
        if (isRegistered == "registered") {
            console.log("registered");
            navigate("../", { replace: true });
        }
    }, [isRegistered])



    return (
        <div className="loginPage">
            <div className="makeFlex">
                <div className="flex1">
                    <img
                        src="https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-1592.jpg?w=740&t=st=1662392452~exp=1662393052~hmac=f8ce1e32ef6df3f47ab708092ef2b9f5390286158be2b87de86b67f02623bafd"
                        alt="LoginImg"
                    />
                </div>
                <div className="flex2">
                    <label for="#username"><strong>Email &nbsp;</strong></label>
                    <input className="middle" autoFocus onChange={handleChange} value={creds.email} type="email" name="email" id="email" />
                    <br /><label className='usernameLabel' for="#username"><strong>Username &nbsp;</strong></label>
                    <input className="middle username" onChange={handleChange} value={creds.username} type="text" name="username" id="username" />
                    <br />
                    <label className="pass" for="#password"><strong>Password &nbsp; </strong></label>
                    <input
                        onChange={handleChange}
                        className="middle pass"
                        type="password"
                        name="password"
                        id="password"
                        value={creds.password}
                    /><br />
                    <p className='errP'>{err != "" && err}</p>
                    <button className="loginButton" onClick={handleClick}>Register</button>
                    <p className='linkToRegister moveLogin'> registered ? Click Here to  <Link to="/" style={{ textDecoration: 'none' }} > Login</Link> </p>
                </div>
            </div>
        </div>
    )


}

export default Register


