import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [flag, setFlag] = useState(false);

    const [isAuthenticated, setAuthenticated] = useState("");
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setLoginForm((prevForm) => {
            return ({
                ...prevForm, [name]: value
            });
        });

        setFlag(false);
    }

    function handleClick() {

        axios.post("http://localhost:4500/login", loginForm)
            .then(function (res) {
                console.log(res.data);
                setAuthenticated(res.data);

            });



        setLoginForm({
            username: "",
            password: ""
        });

        // setFlag(true);

    }
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/user", { state: { data: isAuthenticated } });
        }


    }, [isAuthenticated])


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
                    <label className='alignLeft' for="#username"><strong>Username &nbsp;</strong></label>
                    <input onChange={handleChange} autoFocus className="middle alignLeft" type="text" value={loginForm.username} name="username" id="email" />
                    <br />
                    <label className="pass" for="#password"><strong>Password &nbsp; </strong></label>
                    <input
                        onChange={handleChange}
                        value={loginForm.password}
                        className="middle pass"
                        type="password"
                        name="password"
                        id="password"
                    />
                    <br /><button to="" onClick={handleClick} style={{ textDecoration: 'none' }} className="loginButton">Login</button>
                    <p className='linkToRegister'>Not registered? <Link to="/register" style={{ textDecoration: 'none' }} > Click Here</Link> </p>

                    <h4 className='loginh4'>{flag && "Incorrect email or password"}</h4>
                </div>
            </div>
        </div>
    );

}

export default Login