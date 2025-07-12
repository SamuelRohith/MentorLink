import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudyMaterial() {
  const [materials, setMaterials] = useState([]);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios.get('http://localhost:5000/api/material/materials')
      .then(res => setMaterials(res.data))
      .catch(err => console.error('Error fetching materials:', err));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('tags', tags);
    formData.append('uploadedBy', user._id);

    await axios.post('http://localhost:5000/api/material/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setTitle('');
    setTags('');
    setImage(null);
    axios.get('http://localhost:5000/api/material/materials').then(res => setMaterials(res.data));
  };

  return (
    <div className="content" style={{ paddingTop: '60px' }}>
      <header style={{ backgroundColor: '#000000', padding: '15px', border: '2px solid #00A1D6', borderRadius: '5px', marginBottom: '20px' }}>
        <h1 style={{ color: '#FFFFFF', margin: 0 }}>Study Material</h1>
      </header>
      <form onSubmit={onSubmit} style={{ margin: '20px 0', paddingLeft: '20px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{ margin: '10px 0', padding: '10px', width: '300px', backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #00A1D6' }}
          required
        />
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (e.g., Math, Physics)"
          style={{ margin: '10px 0', padding: '10px', width: '300px', backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #00A1D6' }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ margin: '10px 0', padding: '10px', width: '300px', backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #00A1D6' }}
          required
        />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#00A1D6', color: '#FFFFFF', border: 'none', borderRadius: '5px' }}>Upload</button>
      </form>
      <div style={{ paddingLeft: '20px' }}>
        {materials.map(material => (
          <div key={material._id} style={{ margin: '20px 0', padding: '20px', background: '#000000', border: '1px solid #00A1D6', borderRadius: '5px' }}>
            <img src={`http://localhost:5000${material.url}`} alt={material.title} style={{ maxWidth: '200px', maxHeight: '200px' }} />
            <p style={{ color: '#FFFFFF' }}><strong>{material.uploadedBy.username}</strong>: {material.title}</p>
            <p style={{ color: '#B0B0B8' }}>Tags: {material.tags.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudyMaterial;