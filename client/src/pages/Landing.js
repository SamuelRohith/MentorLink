import React from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center' }}>
      <header>
        <h1 style={{ color: '#FFFFFF' }}>Welcome to MentorLink!</h1>
      </header>
      <p style={{ color: '#B0B0B8' }}>Your central hub for mentorship, learning, and collaboration.</p>
      <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
        <button onClick={() => navigate('/register')} style={{ padding: '12px 24px', backgroundColor: '#00A1D6', color: '#FFFFFF', border: 'none', borderRadius: '5px' }}>Sign Up</button>
        <button onClick={() => navigate('/login')} style={{ padding: '12px 24px', backgroundColor: '#00A1D6', color: '#FFFFFF', border: 'none', borderRadius: '5px' }}>Login</button>
      </div>
    </div>
  );
}

export default Landing;