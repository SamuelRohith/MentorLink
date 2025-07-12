import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchMentors() {
  const [mentors, setMentors] = useState([]);
  const [search, setSearch] = useState('');
  const tags = ['Physics', 'Chemistry', 'Python', 'C', 'Java', 'Math', 'Biology', 'More...'];

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/mentors?username=${search}&tag=${search}`)
      .then(res => setMentors(res.data))
      .catch(err => console.error('Error fetching mentors:', err));
  }, [search]);

  return (
    <div className="content" style={{ paddingLeft: '40px' }}>
      <header style={{ backgroundColor: '#000000', padding: '15px', border: '2px solid #00A1D6', borderRadius: '5px', marginBottom: '20px' }}>
        <h1 style={{ color: '#FFFFFF', margin: 0 }}>Search Mentors</h1>
      </header>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by username or tag"
        style={{ margin: '20px 0', padding: '10px', width: '300px', backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #00A1D6' }}
      />
      <div style={{ margin: '20px 0', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
        {tags.slice(0, 6).map(tag => (
          <button
            key={tag}
            onClick={() => setSearch(tag)}
            style={{ padding: '5px 10px', backgroundColor: search === tag ? '#003087' : '#00A1D6', color: '#FFFFFF', border: 'none', borderRadius: '5px' }}
          >
            {tag}
          </button>
        ))}
        <select onChange={(e) => setSearch(e.target.value)} style={{ padding: '5px 10px', backgroundColor: '#00A1D6', color: '#FFFFFF', border: 'none', borderRadius: '5px' }}>
          <option value="">More...</option>
          {tags.slice(6).map(tag => <option key={tag} value={tag}>{tag}</option>)}
        </select>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {mentors.map(mentor => (
          <div key={mentor._id} style={{ background: '#000000', padding: '20px', borderRadius: '5px', border: '1px solid #00A1D6' }}>
            <h3 style={{ color: '#FFFFFF' }}>{mentor.username || mentor.email}</h3>
            <p style={{ color: '#B0B0B8' }}>Role: {mentor.role}</p>
            <p style={{ color: '#B0B0B8' }}>Tags: {mentor.tags.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchMentors;