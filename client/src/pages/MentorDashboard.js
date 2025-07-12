import React from 'react';

function MentorDashboard() {
  return (
    <div className="content">
      <header>
        <h1>Mentor Dashboard</h1>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', paddingLeft: '20px' }}>
        <div style={{ background: '#16213E', padding: '20px', borderRadius: '10px' }}>
          <h3>My Bookings</h3>
          <p>Scheduled sessions with a calendar.</p>
          <button>Go to My Bookings</button>
        </div>
        <div style={{ background: '#16213E', padding: '20px', borderRadius: '10px' }}>
          <h3>Set Availability</h3>
          <p>Define your available time slots.</p>
          <button>Go to Availability</button>
        </div>
        <div style={{ background: '#16213E', padding: '20px', borderRadius: '10px' }}>
          <h3>Student Questions</h3>
          <p>Respond to questions from students.</p>
          <button>Go to Questions</button>
        </div>
        <div style={{ background: '#16213E', padding: '20px', borderRadius: '10px' }}>
          <h3>Upload Materials</h3>
          <p>Share resources with mentees.</p>
          <button>Go to Upload</button>
        </div>
      </div>
    </div>
  );
}

export default MentorDashboard;