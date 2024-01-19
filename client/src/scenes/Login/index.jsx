import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5515/client/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
  
      // Adding a delay before navigating to '/dashboard'
      setTimeout(() => {
        console.log('Successfully logged in. Redirecting to dashboard...');
        navigate('/dashboard');
      }, 1000); // Adjust the delay time if needed
    }
    // Handle other cases here if needed
  };
  

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="con">
      <h2>Login to continue</h2>
      <form onSubmit={handleSubmit}>
      
        <div className="mb-3 with">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" placeholder='Enter Your Email' />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" placeholder='Enter Pass min length 5' />
          <div id="emailHelp" className="form-text">Enter Min 5 Characters</div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <div className="mt-3">
        <Link to="/register">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default Login;