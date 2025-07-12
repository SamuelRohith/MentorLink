import React from 'react';
import { useNavigate } from 'react-router-dom';

function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="content" style={{ paddingLeft: '40px' }}>
      <header style={{ backgroundColor: '#000000', padding: '15px', border: '2px solid #00A1D6', borderRadius: '5px', marginBottom: '20px' }}>
        <h1 style={{ color: '#FFFFFF', margin: 0 }}>Student Dashboard</h1>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ background: '#16213E', padding: '20px', borderRadius: '10px' }}>
          <h3>Find a Mentor</h3>
          <p>Search for mentors based on skills, experience, and interests.</p>
          <button onClick={() => navigate('/search')}>Go to Find a Mentor</button>
        </div>
        <div style={{ background: '#16213E', padding: '20px', borderRadius: '10px' }}>
          <h3>Notes</h3>
          <p>Access your notes and materials shared by mentors.</p>
          <button onClick={() => navigate('/notes')}>Go to My Notes</button>
        </div>
        <div style={{ background: '#16213E', padding: '20px', borderRadius: '10px' }}>
          <h3>Calendar</h3>
          <p>View upcoming sessions with mentors.</p>
          <button onClick={() => navigate('/calendar')}>Go to Calendar</button>
        </div>
        <div style={{ background: '#16213E', padding: '20px', borderRadius: '10px' }}>
          <h3>Post in Forum</h3>
          <p>Share questions with the community (anonymous option).</p>
          <button onClick={() => navigate('/queries')}>Go to Forum</button>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;