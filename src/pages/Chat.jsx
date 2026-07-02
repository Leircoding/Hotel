import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import ChatInput from '../components/ChatInput';
import CategoryNavigation from '../components/CategoryNavigation';
import './Chat.css';

function Chat({ guestName }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [activeCategory, setActiveCategory] = useState('dining');
  const [showClearOption, setShowClearOption] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('chatMessages');
    if (saved) {
      setMessages(JSON.parse(saved));
      setShowClearOption(true);
    }
  }, []);

  const handleSendMessage = (message) => {
    const userMsg = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const responses = {
      default: "Thanks for your message! Our team has received your request and will respond shortly.",
      maintenance: "I've noted your maintenance request. A team member will visit your room within 15 minutes.",
      dining:
        "Great! I've found some excellent restaurants near the hotel. Check the restaurant board in the lobby or ask at the front desk for recommendations.",
      local:
        "I can help you explore the area! The front desk has maps and local guides. Popular attractions are just a short walk away.",
      contact: "Your message has been received by our staff. Someone will get back to you shortly.",
    };

    let responseText = responses.default;
    if (location.state?.type === 'dining') responseText = responses.dining;
    if (location.state?.type === 'local') responseText = responses.local;
    if (location.state?.type === 'contact-staff') responseText = responses.contact;
    if (message.toLowerCase().includes('maintenance'))
      responseText = responses.maintenance;

    const assistantMsg = {
      id: Date.now() + 1,
      type: 'assistant',
      content: responseText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const newMessages = [...messages, userMsg, assistantMsg];
    setMessages(newMessages);
    localStorage.setItem('chatMessages', JSON.stringify(newMessages));
    setShowClearOption(true);
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      setMessages([]);
      localStorage.removeItem('chatMessages');
      setShowClearOption(false);
    }
  };

  const handleBackToMaintenance = () => {
    navigate('/maintenance');
  };

  return (
    <div className="chat-page">
      <div className="chat-container">
        {messages.length === 0 ? (
          <div className="chat-empty-state">
            <MessageCircle size={64} />
            <h2>Hello, {guestName}</h2>
            <p>Type anything above — I'll handle it.</p>
            <p>Ask for towels, report an issue, find a restaurant.</p>
            <button
              className="form-link"
              onClick={handleBackToMaintenance}
            >
              Prefer to fill out a form instead? Tap here.
            </button>
          </div>
        ) : (
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.type}`}>
                <div className="message-bubble">
                  <p className="message-text">{msg.content}</p>
                  <span className="message-time">{msg.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="chat-input-wrapper">
        {messages.length > 0 && (
          <button className="clear-chat-btn" onClick={handleClearChat}>
            Clear Chat History
          </button>
        )}
        <ChatInput onSubmit={handleSendMessage} />
      </div>
    </div>
  );
}

export default Chat;
