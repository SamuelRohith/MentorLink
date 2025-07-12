import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Queries() {
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');
  const [queries, setQueries] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const isAdmin = user.role === 'admin';

  useEffect(() => {
    axios.get('http://localhost:5000/api/forum/posts')
      .then(res => setQueries(res.data))
      .catch(err => console.error('Error fetching queries:', err));
    socket.on('newPost', (post) => setQueries(prev => [post, ...prev]));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const newQuery = { question, category, anonymous: false, askedBy: user._id };
    await axios.post('http://localhost:5000/api/forum/post', newQuery);
    setQuestion('');
    setCategory('');
  };

  const approveQuery = async (id) => {
    await axios.put(`http://localhost:5000/api/forum/query/${id}/approve`);
    setQueries(queries.map(q => q._id === id ? { ...q, status: 'A' } : q));
  };

  const resolveQuery = async (id) => {
    await axios.put(`http://localhost:5000/api/forum/query/${id}/resolve`);
    setQueries(queries.map(q => q._id === id ? { ...q, status: 'R' } : q));
  };

  const deleteQuery = async (id) => {
    await axios.delete(`http://localhost:5000/api/forum/query/${id}`);
    setQueries(queries.filter(q => q._id !== id));
  };

  const addReply = async (queryId, text) => {
    await axios.post(`http://localhost:5000/api/forum/query/${queryId}/reply`, { text, user });
    const updatedQuery = await axios.get(`http://localhost:5000/api/forum/posts/${queryId}`);
    setQueries(queries.map(q => q._id === queryId ? updatedQuery.data : q));
  };

  const deleteReply = async (queryId, replyIndex) => {
    await axios.delete(`http://localhost:5000/api/forum/query/${queryId}/reply/${replyIndex}`);
    const updatedQuery = await axios.get(`http://localhost:5000/api/forum/posts/${queryId}`);
    setQueries(queries.map(q => q._id === queryId ? updatedQuery.data : q));
  };

  return (
    <div className="content" style={{ paddingLeft: '40px' }}>
      <header style={{ backgroundColor: '#000000', padding: '15px', border: '2px solid #00A1D6', borderRadius: '5px', marginBottom: '20px' }}>
        <h1 style={{ color: '#FFFFFF', margin: 0 }}>Queries</h1>
      </header>
      {!isAdmin && (
        <form onSubmit={onSubmit} style={{ margin: '20px 0' }}>
          <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Your question" style={{ margin: '10px 0', padding: '10px', width: '300px', backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #00A1D6' }} required />
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" style={{ margin: '10px 0', padding: '10px', width: '300px', backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #00A1D6' }} required />
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#00A1D6', color: '#FFFFFF', border: 'none', borderRadius: '5px' }}>Ask</button>
        </form>
      )}
      {isAdmin && (
        <div>
          {queries.filter(q => q.status !== 'R').map(query => (
            <div key={query._id} style={{ margin: '20px 0', padding: '20px', background: '#000000', border: '1px solid #00A1D6', borderRadius: '5px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <p style={{ color: '#FFFFFF' }}><strong>{query.anonymous ? 'Anonymous' : query.askedBy.username}</strong> asked: {query.question} (Category: {query.category})</p>
                {query.status === 'A' && <button onClick={() => resolveQuery(query._id)} style={{ padding: '5px 10px', backgroundColor: '#00A1D6', color: '#FFFFFF', border: 'none', borderRadius: '5px', marginRight: '10px' }}>Resolve</button>}
                {query.status === 'A' && <button onClick={() => deleteQuery(query._id)} style={{ padding: '5px 10px', backgroundColor: '#FF4444', color: '#FFFFFF', border: 'none', borderRadius: '5px' }}>X</button>}
              </div>
              <div style={{ marginLeft: '20px' }}>
                {query.replies.map((reply, index) => (
                  <div key={index} style={{ margin: '10px 0', color: '#B0B0B8' }}>
                    <strong>{reply.username}</strong> at {new Date(reply.timestamp).toLocaleTimeString()}: {reply.text}
                    {isAdmin && <button onClick={() => deleteReply(query._id, index)} style={{ marginLeft: '10px', padding: '2px 5px', backgroundColor: '#FF4444', color: '#FFFFFF', border: 'none', borderRadius: '5px' }}>X</button>}
                  </div>
                ))}
                <input
                  type="text"
                  placeholder="Add a reply..."
                  onKeyPress={(e) => { if (e.key === 'Enter') addReply(query._id, e.target.value); e.target.value = ''; }}
                  style={{ margin: '10px 0', padding: '10px', width: '300px', backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #00A1D6' }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {!isAdmin && queries.filter(q => q.status === 'A').map(query => (
        <div key={query._id} style={{ margin: '20px 0', padding: '20px', background: '#000000', border: '1px solid #00A1D6', borderRadius: '5px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <p style={{ color: '#FFFFFF' }}><strong>{query.anonymous ? 'Anonymous' : query.askedBy.username}</strong> asked: {query.question} (Category: {query.category})</p>
          </div>
          <div style={{ marginLeft: '20px' }}>
            {query.replies.map((reply, index) => (
              <div key={index} style={{ margin: '10px 0', color: '#B0B0B8' }}>
                <strong>{reply.username}</strong> at {new Date(reply.timestamp).toLocaleTimeString()}: {reply.text}
              </div>
            ))}
            <input
              type="text"
              placeholder="Add a reply..."
              onKeyPress={(e) => { if (e.key === 'Enter') addReply(query._id, e.target.value); e.target.value = ''; }}
              style={{ margin: '10px 0', padding: '10px', width: '300px', backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #00A1D6' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Queries;