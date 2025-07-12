import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function AskDoubts() {
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');
  const [posts, setPosts] = useState([]);
  const [replies, setReplies] = useState({});
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios.get('http://localhost:5000/api/forum/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error('Error fetching posts:', err));

    socket.on('newPost', (post) => setPosts(prev => [post, ...prev]));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const newPost = { question, category, anonymous: false, askedBy: user._id };
    const res = await axios.post('http://localhost:5000/api/forum/post', newPost, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    socket.emit('newPost', res.data);
    setQuestion('');
    setCategory('');
  };

  const addReply = (postId, reply) => {
    setReplies({ ...replies, [postId]: [...(replies[postId] || []), { text: reply, username: user.username, timestamp: new Date() }] });
  };

  return (
    <div className="content" style={{ paddingTop: '60px' }}>
      <header style={{ backgroundColor: '#000000', padding: '15px', border: '2px solid #00A1D6', borderRadius: '5px', marginBottom: '20px' }}>
        <h1 style={{ color: '#FFFFFF', margin: 0 }}>Ask Doubts</h1>
      </header>
      <form onSubmit={onSubmit} style={{ margin: '20px 0', paddingLeft: '20px' }}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Your question"
          style={{ margin: '10px 0', padding: '10px', width: '600px', backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #00A1D6' }}
          required
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          style={{ margin: '10px 0', padding: '10px', width: '300px', backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #00A1D6' }}
          required
        />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#00A1D6', color: '#FFFFFF', border: 'none', borderRadius: '5px' }}>Ask</button>
      </form>
      {posts.map(post => (
        <div key={post._id} style={{ margin: '20px 0', padding: '20px', background: '#000000', border: '1px solid #00A1D6', borderRadius: '5px' }}>
          <p style={{ color: '#FFFFFF' }}><strong>{post.anonymous ? 'Anonymous' : post.askedBy.username}</strong> asked: {post.question} (Category: {post.category})</p>
          <div style={{ marginTop: '10px' }}>
            {replies[post._id]?.map((reply, index) => (
              <p key={index} style={{ color: '#B0B0B8' }}><strong>{reply.username}</strong> replied at {reply.timestamp.toLocaleTimeString()}: {reply.text}</p>
            ))}
            <input
              type="text"
              placeholder="Add a reply..."
              onKeyPress={(e) => { if (e.key === 'Enter') addReply(post._id, e.target.value); e.target.value = ''; }}
              style={{ margin: '10px 0', padding: '10px', width: '600px', backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #00A1D6' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default AskDoubts;