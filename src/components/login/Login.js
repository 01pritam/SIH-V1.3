
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Import your CSS file

const Login = ({ setLoginUser, setAuthToken }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    axios
      .post('http://localhost:9002/login', user)
      .then((res) => {
        // For debugging purposes, log the response
        console.log('Response:', res.data);

        if (res.data.success) {
          // If login is successful, set the user and navigate to '/'
          setLoginUser(res.data.user);
          // Assuming your JWT token is sent as 'token' in the response
          const jwtToken = res.data.token;
          console.log('JWT Token:', jwtToken); // Log the JWT token
          // Store the JWT token in local storage
          localStorage.setItem('jwtToken', jwtToken);
          setAuthToken(jwtToken); // Set authToken in App.js
          navigate('/');
        } else {
          // If login fails, display the error message
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='login-website'>
      <div className="overlay"></div>
      <img src="https://images.unsplash.com/photo-1623141629340-4686d65d60bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Login Image" className="login-image" />
      <div className='Login-page'>
        <div className="login">
          <h1 className="website-name"><span>Inno</span>Gen</h1>
          <h1 className="welcome">Welcome Back!</h1>
          <h2>Login to continue</h2>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Enter your Email"
          />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter your Password"

          />
          <div className="button" onClick={login}>
            Login
          </div>
          <div>or</div>
          <div className="button register" onClick={() => navigate('/register')}>
            Register
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
