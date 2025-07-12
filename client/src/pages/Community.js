import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Community() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const isAdmin = user.role === 'admin';

  useEffect(() => {
    axios.get('http://localhost:5000/api/forum/posts')
      .then(res => setComments(res.data))
      .catch(err => console.error('Error fetching comments:', err));
    socket.on('newPost', (post) => setComments(prev => [post, ...prev]));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const newComment = { question: comment, category: 'community', anonymous: false, askedBy: user._id };
    await axios.post('http://localhost:5000/api/forum/post', newComment);
    setComment('');
  };

  const deleteComment = async (id) => {
    await axios.delete(`http://localhost:5000/api/forum/query/${id}`);
    setComments(comments.filter(c => c._id !== id));
  };

  return (
    <div className="content" style={{ paddingLeft: '40px' }}>
      <header style={{ backgroundColor: '#000000', padding: '15px', border: '2px solid #00A1D6', borderRadius: '5px', marginBottom: '20px' }}>
        <h1 style={{ color: '#FFFFFF', margin: 0 }}>Community</h1>
      </header>
      {!isAdmin && (
        <form onSubmit={onSubmit} style={{ margin: '20px 0' }}>
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment..." style={{ margin: '10px 0', padding: '10px', width: '300px', backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #00A1D6' }} required />
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#00A1D6', color: '#FFFFFF', border: 'none', borderRadius: '5px' }}>Post</button>
        </form>
      )}
      {isAdmin && comments.filter(c => c.category === 'community').map(comment => (
        <div key={comment._id} style={{ margin: '20px 0', padding: '20px', background: '#000000', border: '1px solid #00A1D6', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>
          <p style={{ color: '#FFFFFF', flex: 1 }}><strong>{comment.anonymous ? 'Anonymous' : comment.askedBy.username}</strong>: {comment.question}</p>
          <button onClick={() => deleteComment(comment._id)} style={{ padding: '5px 10px', backgroundColor: '#FF4444', color: '#FFFFFF', border: 'none', borderRadius: '5px' }}>X</button>
        </div>
      ))}
      {!isAdmin && comments.filter(c => c.category === 'community' && c.status === 'A').map(comment => (
        <div key={comment._id} style={{ margin: '20px 0', padding: '20px', background: '#000000', border: '1px solid #00A1D6', borderRadius: '5px' }}>
          <p style={{ color: '#B0B0B8' }}><strong>{comment.anonymous ? 'Anonymous' : comment.askedBy.username}</strong>: {comment.question}</p>
        </div>
      ))}
    </div>
  );
}

export default Community;