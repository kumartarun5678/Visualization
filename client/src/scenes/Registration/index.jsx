import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';

const Registration = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch("http://localhost:5515/client/registration", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            
            props.showAlert("Invalid Credentials", "danger"); 
             // Fix the function name here
        } else {
          props.showAlert("Account created successfully", "success");
          navigate("/"); // Fix the function name here
        }
    }

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className="con">
            <h2 className='my-3'>Create an account</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onchange} aria-describedby="emailHelp" placeholder='Enter Your Name' />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" onChange={onchange} aria-describedby="emailHelp" placeholder='Enter Your Email' />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onchange} minLength={5} placeholder='Enter 5 length password' required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onchange} minLength={5} required placeholder='Enter 5 length password' />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className="mt-3">
        <Link to="/login">Forgot Password?</Link>
      </div>
        </div>
    );
};

export default Registration;