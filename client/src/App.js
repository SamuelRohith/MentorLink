import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import MentorDashboard from './pages/MentorDashboard';
import Chat from './components/Chat';
import SearchMentors from './pages/SearchMentors';
import Login from './pages/Login';
import Community from './pages/Community';
import Queries from './pages/Queries';
import StudyMaterial from './pages/StudyMaterial';
import Profile from './pages/Profile';
import './styles/App.css';

function LayoutWithSidebar({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const isAdmin = user.role === 'admin';

  return (
    <div className="app">
      <div className="sidebar" style={{ paddingLeft: '20px' }}>
        <div style={{ fontSize: '24px', color: '#00A1D6', marginBottom: '20px' }}>🌟 MentorLink</div>
        <a href="/student-dashboard" style={{ marginLeft: '10px' }}>Dashboard</a>
        <a href="/search" style={{ marginLeft: '10px' }}>Search Mentors</a>
        <a href="/messages" style={{ marginLeft: '10px' }}>Messages</a>
        <a href="/community" style={{ marginLeft: '10px' }}>Community</a>
        <a href="/queries" style={{ marginLeft: '10px' }}>Queries</a>
        <a href="/study-material" style={{ marginLeft: '10px' }}>Study Material</a>
        <a href="/profile" style={{ marginLeft: '10px' }}>Profile</a>
        {user._id && <button onClick={() => { localStorage.removeItem('user'); navigate('/'); }} style={{ marginTop: '20px', padding: '10px', backgroundColor: '#FF4444', color: '#FFFFFF', border: 'none', borderRadius: '5px', marginLeft: '10px' }}>Logout</button>}
      </div>
      <div className="content" style={{ paddingLeft: '40px' }}>{children}</div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-dashboard" element={<LayoutWithSidebar><StudentDashboard /></LayoutWithSidebar>} />
        <Route path="/mentor-dashboard" element={<LayoutWithSidebar><MentorDashboard /></LayoutWithSidebar>} />
        <Route path="/messages" element={<LayoutWithSidebar><Chat /></LayoutWithSidebar>} />
        <Route path="/search" element={<LayoutWithSidebar><SearchMentors /></LayoutWithSidebar>} />
        <Route path="/community" element={<LayoutWithSidebar><Community /></LayoutWithSidebar>} />
        <Route path="/queries" element={<LayoutWithSidebar><Queries /></LayoutWithSidebar>} />
        <Route path="/study-material" element={<LayoutWithSidebar><StudyMaterial /></LayoutWithSidebar>} />
        <Route path="/profile" element={<LayoutWithSidebar><Profile /></LayoutWithSidebar>} />
      </Routes>
    </Router>
  );
}

export default App;