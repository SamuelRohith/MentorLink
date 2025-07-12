import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchMentors() {
  const [mentors, setMentors] = useState([]);
  const [searchTag, setSearchTag] = useState('');
  const tags = ['Physics', 'Chemistry', 'Python', 'C', 'Java', 'Math', 'Biology'];

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/mentors?tag=' + searchTag)
      .then(res => setMentors(res.data))
      .catch(err => console.error('Error fetching mentors:', err));
  }, [searchTag]);

  return (
    <div className="content" style={{ paddingTop: '60px' }}>
      <header>
        <h1 style={{ color: '#FFFFFF' }}>Search Mentors</h1>
      </header>
      <input
        type="text"
        value={searchTag}
        onChange={(e) => setSearchTag(e.target.value)}
        placeholder="Search by tag (e.g., Physics, Python)"
        style={{ margin: '20px 0', padding: '10px', width: '300px', backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #00A1D6' }}
      />
      <div style={{ margin: '20px 0', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => setSearchTag(tag)}
            style={{ padding: '5px 10px', backgroundColor: searchTag === tag ? '#003087' : '#00A1D6', color: '#FFFFFF', border: 'none', borderRadius: '5px' }}
          >
            {tag}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', paddingLeft: '20px' }}>
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