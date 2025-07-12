import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log('Login successful:', res.data);
      alert('Login successful! Redirecting...');
      window.location.href = '/student-dashboard';
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      alert('Login failed: ' + (err.response?.data.msg || 'Server error'));
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#000000',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        border: '2px solid #00A1D6',
        borderRadius: '10px',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <h1 style={{
          color: '#FFFFFF',
          textAlign: 'center',
          margin: 0,
          fontSize: '24px'
        }}>Login</h1>

        <form onSubmit={onSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={onChange} 
            placeholder="Email" 
            style={inputStyle}
            required 
          />
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={onChange} 
            placeholder="Password" 
            style={inputStyle}
            required 
          />
          <button type="submit" style={buttonStyle}>
            Login
          </button>
          <a href="http://localhost:5000/api/auth/google" style={{ textDecoration: 'none' }}>
            <button type="button" style={{ ...buttonStyle, backgroundColor: '#DB4437', border: 'none' }}>
              Login with Google
            </button>
          </a>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '12px',
  backgroundColor: '#000000',
  color: '#FFFFFF',
  border: '1px solid #00A1D6',
  borderRadius: '5px',
  width: '100%',
  boxSizing: 'border-box'
};

const buttonStyle = {
  padding: '12px',
  backgroundColor: '#00A1D6',
  color: '#FFFFFF',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  width: '100%',
  fontSize: '16px',
  fontWeight: 'bold'
};

export default Login;