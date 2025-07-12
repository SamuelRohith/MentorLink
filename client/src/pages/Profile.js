import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [tags, setTags] = useState(user.tags || []);
  const [newTag, setNewTag] = useState('');
  const allTags = ['Physics', 'Chemistry', 'Python', 'C', 'Java', 'Math', 'Biology'];

  const updateTags = async () => {
    await axios.put(`http://localhost:5000/api/users/${user._id}`, { tags });
    localStorage.setItem('user', JSON.stringify({ ...user, tags }));
  };

  const addTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
      updateTags();
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter(t => t !== tag));
    updateTags();
  };

  const createTag = () => {
    if (newTag && !allTags.includes(newTag) && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
      updateTags();
    }
  };

  return (
    <div className="content" style={{ paddingLeft: '40px' }}>
      <header style={{ backgroundColor: '#000000', padding: '15px', border: '2px solid #00A1D6', borderRadius: '5px', marginBottom: '20px' }}>
        <h1 style={{ color: '#FFFFFF', margin: 0 }}>{user.username}</h1>
      </header>
      <p style={{ color: '#B0B0B8' }}>Email: {user.email}</p>
      <div style={{ margin: '20px 0' }}>
        <h3 style={{ color: '#FFFFFF' }}>Tags</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {tags.map(tag => (
            <button key={tag} onClick={() => removeTag(tag)} style={{ padding: '5px 10px', backgroundColor: '#00A1D6', color: '#FFFFFF', border: 'none', borderRadius: '5px' }}>{tag} X</button>
          ))}
        </div>
        <select onChange={(e) => addTag(e.target.value)} style={{ margin: '10px 0', padding: '10px', backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #00A1D6', borderRadius: '5px' }}>
          <option value="">Add Tag</option>
          {allTags.filter(t => !tags.includes(t)).map(tag => <option key={tag} value={tag}>{tag}</option>)}
        </select>
        <div style={{ marginTop: '10px' }}>
          <input type="text" value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="Create new tag" style={{ margin: '10px 0', padding: '10px', width: '200px', backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #00A1D6' }} />
          <button onClick={createTag} style={{ padding: '10px 20px', backgroundColor: '#00A1D6', color: '#FFFFFF', border: 'none', borderRadius: '5px' }}>Create</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;