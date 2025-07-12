import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Community() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios.get('http://localhost:5000/api/forum/posts')
      .then(res => setComments(res.data))
      .catch(err => console.error('Error fetching comments:', err));

    socket.on('newPost', (post) => setComments(prev => [post, ...prev]));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const newComment = { question: comment, category: 'community', anonymous: false, askedBy: user._id };
    const res = await axios.post('http://localhost:5000/api/forum/post', newComment, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    socket.emit('newPost', res.data);
    setComment('');
  };

  return (
    <div className="content" style={{ paddingTop: '60px' }}>
      <header style={{ backgroundColor: '#000000', padding: '15px', border: '2px solid #00A1D6', borderRadius: '5px', marginBottom: '20px' }}>
        <h1 style={{ color: '#FFFFFF', margin: 0 }}>Community</h1>
      </header>
      <form onSubmit={onSubmit} style={{ margin: '20px 0', paddingLeft: '20px' }}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          style={{ margin: '10px 0', padding: '10px', width: '600px', backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #00A1D6' }}
          required
        />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#00A1D6', color: '#FFFFFF', border: 'none', borderRadius: '5px' }}>Post</button>
      </form>
      <ol style={{ paddingLeft: '20px' }}>
        {comments.filter(c => c.category === 'community').map(post => (
          <li key={post._id} style={{ margin: '10px 0', color: '#B0B0B8' }}>
            <strong>{post.anonymous ? 'Anonymous' : post.askedBy.username}</strong>: {post.question}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Community;