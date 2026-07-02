import { useState } from 'react';
import './ChatInput.css';

function ChatInput({ onSubmit, placeholder = 'Type anything — I\'ll handle it' }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit(message);
      setMessage('');
    }
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="chat-input"
        placeholder={placeholder}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        aria-label="Message input"
      />
    </form>
  );
}

export default ChatInput;
