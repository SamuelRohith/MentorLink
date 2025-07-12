import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import MentorDashboard from './pages/MentorDashboard';
import Chat from './components/Chat';
import SearchMentors from './pages/SearchMentors';
import Login from './pages/Login';
import Community from './pages/Community';
import AskDoubts from './pages/AskDoubts';
import StudyMaterial from './pages/StudyMaterial';
import './styles/App.css';

function LayoutWithSidebar({ children }) {
  return (
    <div className="app">
      <div className="sidebar">
        <div style={{ fontSize: '24px', color: '#00A1D6', marginBottom: '20px' }}>🌟 MentorLink</div>
        <a href="/student-dashboard">Dashboard</a>
        <a href="/search">Search Mentors</a>
        <a href="/messages">Messages</a>
        <a href="/community">Community</a>
        <a href="/ask-doubts">Ask Doubts</a>
        <a href="/study-material">Study Material</a>
      </div>
      <div className="content">{children}</div>
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
        <Route
          path="/student-dashboard"
          element={
            <LayoutWithSidebar>
              <StudentDashboard />
            </LayoutWithSidebar>
          }
        />
        <Route
          path="/mentor-dashboard"
          element={
            <LayoutWithSidebar>
              <MentorDashboard />
            </LayoutWithSidebar>
          }
        />
        <Route
          path="/messages"
          element={
            <LayoutWithSidebar>
              <Chat />
            </LayoutWithSidebar>
          }
        />
        <Route
          path="/search"
          element={
            <LayoutWithSidebar>
              <SearchMentors />
            </LayoutWithSidebar>
          }
        />
        <Route
          path="/community"
          element={
            <LayoutWithSidebar>
              <Community />
            </LayoutWithSidebar>
          }
        />
        <Route
          path="/ask-doubts"
          element={
            <LayoutWithSidebar>
              <AskDoubts />
            </LayoutWithSidebar>
          }
        />
        <Route
          path="/study-material"
          element={
            <LayoutWithSidebar>
              <StudyMaterial />
            </LayoutWithSidebar>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;