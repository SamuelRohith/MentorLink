import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [receiverId, setReceiverId] = useState('');

  useEffect(() => {
    socket.on('receiveMessage', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit('sendMessage', { senderId: 'userId', receiverId, content: message });
    setMessage('');
  };

  return (
    <div className="content" style={{ paddingTop: '60px' }}>
      <header>
        <h1 style={{ color: '#FFFFFF' }}>Chats</h1>
      </header>
      <input
        type="text"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
        placeholder="Receiver ID"
        style={{ margin: '20px 0', padding: '10px', width: '1000%', maxWidth: '800px', backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #00A1D6' }}
      />
      <div
        style={{
          height: '300px',
          overflowY: 'scroll',
          border: '1px solid #00A1D6',
          padding: '20px',
          margin: '20px 0',
          backgroundColor: '#000000',
          width: '1000%',
          maxWidth: '800px',
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: '10px 0', color: '#B0B0B8' }}>
            {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
        style={{ margin: '20px 0', padding: '10px', width: '1000%', maxWidth: '800px', backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #00A1D6' }}
      />
      <button onClick={sendMessage} style={{ padding: '10px 20px', backgroundColor: '#00A1D6', color: '#FFFFFF', border: 'none', borderRadius: '5px' }}>
        Send
      </button>
    </div>
  );
}

export default Chat;