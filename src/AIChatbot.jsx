import React, { useState, useRef, useEffect, useCallback } from 'react';
import { getResponse, quickActions } from './deepakData';

// Simple markdown-like bold parsing
const formatText = (text) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to latest message
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 400);
    }
  }, [isOpen]);

  // Auto greeting after 3 seconds
  useEffect(() => {
    if (hasGreeted) return;
    const timer = setTimeout(() => {
      setHasGreeted(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [hasGreeted]);

  const addBotMessage = useCallback((text, followUp = [], action = null) => {
    setIsTyping(true);
    const delay = Math.min(600 + text.length * 2, 1500);
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text, followUp, action }]);
      setIsTyping(false);

      // Execute action
      if (action) {
        if (action.type === 'scroll') {
          setTimeout(() => {
            const el = document.querySelector(action.target);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 500);
        } else if (action.type === 'download') {
          setTimeout(() => {
            const a = document.createElement('a');
            a.href = action.target;
            a.download = 'Deepak_Anmol_CV.pdf';
            a.click();
          }, 800);
        }
      }
    }, delay);
  }, []);

  // Send greeting when chat first opens
  const handleOpen = useCallback(() => {
    setIsOpen(true);
    if (messages.length === 0) {
      setTimeout(() => {
        addBotMessage(
          "Hi! 👋 I'm Deepak's AI assistant. I can help you explore his professional journey, skills, and impact. What would you like to know?",
          ["Who is Deepak?", "View Experience", "Download CV", "Contact Deepak"]
        );
      }, 300);
    }
  }, [messages.length, addBotMessage]);

  const handleSend = useCallback((text) => {
    const msg = text || input.trim();
    if (!msg) return;

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: msg }]);
    setInput('');

    // Get response from knowledge base
    const result = getResponse(msg);
    addBotMessage(result.text, result.followUp, result.action);
  }, [input, addBotMessage]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Orb Button */}
      <button
        className={`chatbot-orb ${isOpen ? 'orb-hidden' : ''} ${hasGreeted && !isOpen && messages.length === 0 ? 'orb-notify' : ''}`}
        onClick={handleOpen}
        aria-label="Open AI Assistant"
      >
        <span className="orb-icon">🤖</span>
        <span className="orb-ring"></span>
        {hasGreeted && !isOpen && messages.length === 0 && (
          <span className="orb-badge">1</span>
        )}
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'chatbot-open' : ''}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <span className="chatbot-avatar">🤖</span>
            <div>
              <div className="chatbot-name">Deepak's AI Assistant</div>
              <div className="chatbot-status">
                <span className="status-dot"></span> Online
              </div>
            </div>
          </div>
          <button className="chatbot-close" onClick={() => setIsOpen(false)}>✕</button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-msg ${msg.sender}`}>
              {msg.sender === 'bot' && <span className="chat-msg-avatar">🤖</span>}
              <div className="chat-bubble">
                {msg.text.split('\n').map((line, j) => (
                  <p key={j}>{formatText(line)}</p>
                ))}
              </div>
            </div>
          ))}

          {/* Follow-up suggestions from last bot message */}
          {messages.length > 0 && messages[messages.length - 1].sender === 'bot' && messages[messages.length - 1].followUp?.length > 0 && !isTyping && (
            <div className="chat-followups">
              {messages[messages.length - 1].followUp.map((f, i) => (
                <button key={i} className="chat-chip" onClick={() => handleSend(f)}>{f}</button>
              ))}
            </div>
          )}

          {/* Typing indicator */}
          {isTyping && (
            <div className="chat-msg bot">
              <span className="chat-msg-avatar">🤖</span>
              <div className="chat-bubble typing-bubble">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length <= 1 && (
          <div className="chatbot-quick-actions">
            {quickActions.map((qa, i) => (
              <button key={i} className="quick-action-btn" onClick={() => handleSend(qa.query)}>
                {qa.label}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="chatbot-input-area">
          <input
            ref={inputRef}
            type="text"
            className="chatbot-input"
            placeholder="Ask me about Deepak..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
          />
          <button className="chatbot-send" onClick={() => handleSend()} disabled={isTyping || !input.trim()}>
            ➤
          </button>
        </div>
      </div>
    </>
  );
};

export default AIChatbot;
