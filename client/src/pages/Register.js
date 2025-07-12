import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    role: 'student',
    academicDetails: { year: '', major: '', institution: '' },
    tags: [],
  });

  const onChange = (e) => {
    if (e.target.name === 'tags') {
      setFormData({ ...formData, tags: e.target.value.split(',').map(tag => tag.trim()) });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onAcademicChange = (e) => setFormData({
    ...formData,
    academicDetails: { ...formData.academicDetails, [e.target.name]: e.target.value },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log('Registration successful:', res.data);
      alert('Registration successful! Please log in.');
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      alert('Registration failed: ' + (err.response?.data.msg || 'Server error'));
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
        }}>Register</h1>

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
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={onChange} 
            placeholder="Username" 
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
          <select 
            name="role" 
            value={formData.role} 
            onChange={onChange} 
            style={inputStyle}
          >
            <option value="student">Student</option>
            <option value="mentor">Mentor</option>
          </select>
          <input 
            type="text" 
            name="year" 
            value={formData.academicDetails.year} 
            onChange={onAcademicChange} 
            placeholder="Year" 
            style={inputStyle}
          />
          <input 
            type="text" 
            name="major" 
            value={formData.academicDetails.major} 
            onChange={onAcademicChange} 
            placeholder="Major" 
            style={inputStyle}
          />
          <input 
            type="text" 
            name="institution" 
            value={formData.academicDetails.institution} 
            onChange={onAcademicChange} 
            placeholder="Institution" 
            style={inputStyle}
          />
          <input 
            type="text" 
            name="tags" 
            value={formData.tags.join(', ')} 
            onChange={onChange} 
            placeholder="Tags (e.g., Math, CS, Physics)" 
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Register
          </button>
          <a href="http://localhost:5000/api/auth/google" style={{ textDecoration: 'none' }}>
            <button type="button" style={{ ...buttonStyle, backgroundColor: '#DB4437', border: 'none' }}>
              Sign up with Google
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

export default Register;