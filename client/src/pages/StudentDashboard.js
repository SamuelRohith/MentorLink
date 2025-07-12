import React from 'react';

function StudentDashboard() {
  return (
    <div className="content">
      <header>
        <h1>Student Dashboard</h1>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', paddingLeft: '20px' }}>
        <div style={{ background: '#16213E', padding: '20px', borderRadius: '10px' }}>
          <h3>Find a Mentor</h3>
          <p>Search for mentors based on skills, experience, and interests.</p>
          <button>Go to Find a Mentor</button>
        </div>
        <div style={{ background: '#16213E', padding: '20px', borderRadius: '10px' }}>
          <h3>My Notes and Shared Materials</h3>
          <p>Access your notes and materials shared by mentors.</p>
          <button>Go to My Notes</button>
        </div>
        <div style={{ background: '#16213E', padding: '20px', borderRadius: '10px' }}>
          <h3>Calendar</h3>
          <p>View upcoming sessions with mentors.</p>
          <button>Go to Calendar</button>
        </div>
        <div style={{ background: '#16213E', padding: '20px', borderRadius: '10px' }}>
          <h3>Post in Forum</h3>
          <p>Share questions with the community (anonymous option).</p>
          <button>Go to Forum</button>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;