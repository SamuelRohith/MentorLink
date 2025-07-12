import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudyMaterial() {
  const [materials, setMaterials] = useState([]);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [search, setSearch] = useState('');
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const isAdmin = user.role === 'admin';

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
    formData.append('user', JSON.stringify({ _id: user._id }));
    await axios.post('http://localhost:5000/api/material/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    setTitle('');
    setTags('');
    setImage(null);
    axios.get('http://localhost:5000/api/material/materials').then(res => setMaterials(res.data));
  };

  const approveMaterial = async (id) => {
    await axios.put(`http://localhost:5000/api/material/${id}/approve`);
    setMaterials(materials.map(m => m._id === id ? { ...m, status: 'D' } : m));
  };

  const deleteMaterial = async (id) => {
    await axios.delete(`http://localhost:5000/api/material/${id}`);
    setMaterials(materials.filter(m => m._id !== id));
  };

  const filteredMaterials = materials.filter(m => m.status === 'D' && (m.title.toLowerCase().includes(search.toLowerCase()) || m.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))));

  return (
    <div className="content" style={{ paddingLeft: '40px' }}>
      <header style={{ backgroundColor: '#000000', padding: '15px', border: '2px solid #00A1D6', borderRadius: '5px', marginBottom: '20px' }}>
        <h1 style={{ color: '#FFFFFF', margin: 0 }}>Study Material</h1>
      </header>
      {!isAdmin && (
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title or tags" style={{ margin: '20px 0', padding: '10px', width: '300px', backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #00A1D6' }} />
      )}
      {isAdmin && (
        <form onSubmit={onSubmit} style={{ margin: '20px 0' }}>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" style={{ margin: '10px 0', padding: '10px', width: '300px', backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #00A1D6' }} required />
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (e.g., Math, Physics)" style={{ margin: '10px 0', padding: '10px', width: '300px', backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #00A1D6' }} />
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} style={{ margin: '10px 0', padding: '10px', width: '300px', backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #00A1D6' }} required />
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#00A1D6', color: '#FFFFFF', border: 'none', borderRadius: '5px' }}>Upload</button>
        </form>
      )}
      {materials.map(material => (
        <div key={material._id} style={{ margin: '20px 0', padding: '20px', background: '#000000', border: '1px solid #00A1D6', borderRadius: '5px' }}>
          <img src={`http://localhost:5000${material.url}`} alt={material.title} style={{ maxWidth: '200px', maxHeight: '200px' }} />
          <p style={{ color: '#FFFFFF' }}><strong>{material.uploadedBy.username}</strong>: {material.title}</p>
          <p style={{ color: '#B0B0B8' }}>Tags: {material.tags.join(', ')}</p>
          {isAdmin && material.status === 'A' && <button onClick={() => approveMaterial(material._id)} style={{ padding: '5px 10px', backgroundColor: '#00A1D6', color: '#FFFFFF', border: 'none', borderRadius: '5px', marginRight: '10px' }}>Approve</button>}
          {isAdmin && <button onClick={() => deleteMaterial(material._id)} style={{ padding: '5px 10px', backgroundColor: '#FF4444', color: '#FFFFFF', border: 'none', borderRadius: '5px' }}>X</button>}
        </div>
      ))}
      {!isAdmin && filteredMaterials.map(material => (
        <div key={material._id} style={{ margin: '20px 0', padding: '20px', background: '#000000', border: '1px solid #00A1D6', borderRadius: '5px' }}>
          <img src={`http://localhost:5000${material.url}`} alt={material.title} style={{ maxWidth: '200px', maxHeight: '200px' }} />
          <p style={{ color: '#FFFFFF' }}><strong>{material.uploadedBy.username}</strong>: {material.title}</p>
          <p style={{ color: '#B0B0B8' }}>Tags: {material.tags.join(', ')}</p>
        </div>
      ))}
    </div>
  );
}

export default StudyMaterial;