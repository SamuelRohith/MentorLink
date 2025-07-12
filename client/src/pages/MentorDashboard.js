import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MentorDashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/students?tags=${search}`)
      .then(res => setStudents(res.data))
      .catch(err => console.error('Error fetching students:', err));
  }, [search]);

  return (
    <div className="content" style={{ paddingLeft: '40px' }}>
      <header style={{ backgroundColor: '#000000', padding: '15px', border: '2px solid #00A1D6', borderRadius: '5px', marginBottom: '20px' }}>
        <h1 style={{ color: '#FFFFFF', margin: 0 }}>Mentor Dashboard</h1>
      </header>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search students by tags"
        style={{ margin: '20px 0', padding: '10px', width: '300px', backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #00A1D6' }}
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ background: '#16213E', padding: '20px', borderRadius: '10px' }}>
          <h3>My Bookings</h3>
          <p>Scheduled sessions with a calendar.</p>
          <button onClick={() => navigate('/bookings')}>Go to My Bookings</button>
        </div>
        <div style={{ background: '#16213E', padding: '20px', borderRadius: '10px' }}>
          <h3>Set Availability</h3>
          <p>Define your available time slots.</p>
          <button onClick={() => navigate('/availability')}>Go to Availability</button>
        </div>
        <div style={{ background: '#16213E', padding: '20px', borderRadius: '10px' }}>
          <h3>Student Questions</h3>
          <p>Respond to questions from students.</p>
          <button onClick={() => navigate('/questions')}>Go to Questions</button>
        </div>
        <div style={{ background: '#16213E', padding: '20px', borderRadius: '10px' }}>
          <h3>Upload Materials</h3>
          <p>Share resources with mentees.</p>
          <button onClick={() => navigate('/upload')}>Go to Upload</button>
        </div>
      </div>
      <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {students.map(student => (
          <div key={student._id} style={{ background: '#000000', padding: '20px', borderRadius: '5px', border: '1px solid #00A1D6' }}>
            <h3 style={{ color: '#FFFFFF' }}>{student.username}</h3>
            <p style={{ color: '#B0B0B8' }}>Tags: {student.tags.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MentorDashboard;