import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css'; // Import your CSS file

const Register = ({ setLoginUser }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '', // New field for confirming the password
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = () => {
    // Check if the passwords match before sending the request
    if (user.password !== user.confirmPassword) {
      alert("Passwords don't match. Please check your password.");
      return;
    }
    console.log("this is runnig ")
    axios
      .post('http://localhost:9002/register', user) // Replace with your registration API endpoint
      .then((res) => {
        // For debugging purposes, log the response

        console.log('Response:', res.data);

        if (res.data.success) {
          // If registration is successful, set the user and navigate to '/projects'
          //setLoginUser(res.data.user);
          const { email, password } = res.data.user;
          setLoginUser({ email, password });
          // Assuming your JWT token is sent as 'token' in the response
          const jwtToken = res.data.token;
          console.log('JWT Token:', jwtToken); // Log the JWT token
          // Store the JWT token in local storage
          localStorage.setItem('jwtToken', jwtToken);
          navigate('/projects');
          window.location.reload();
        } else {
          // If registration fails, display the error message
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Enter your Name"
      />
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
        placeholder="Create a Password"
      />
      <input
        type="password"
        name="confirmPassword"
        value={user.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
      />
      <div className="button" onClick={register}>
        Register
      </div>
      <div>or</div>
      <div className="button login" onClick={() => navigate('/login')}>
        Login
      </div>
    </div>
  );
};

export default Register;
