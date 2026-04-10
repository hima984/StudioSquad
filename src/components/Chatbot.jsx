import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import './Chatbot.css';

/* ─── Initial bot messages ──────────────────────────────────────── */
const initialMessages = [
  {
    id: 'm1',
    role: 'bot',
    text: 'Hey there! 👋 I\'m Muse, your creative AI assistant. How can I help you today?',
    time: 'Just now',
  },
];

/* ─── Quick reply suggestions ───────────────────────────────────── */
const quickReplies = [
  'Suggest a course for me',
  'What\'s trending today?',
  'Find me a community',
  'Help me get started',
];

/* ─── Bot auto-replies (simple pattern matching) ─────────────────── */
const getBotReply = (userMsg) => {
  const msg = userMsg.toLowerCase();

  if (msg.includes('course')) {
    return 'Great choice! 🎓 Check out "Character Design Fundamentals" by Maya Chen — it\'s one of our highest-rated courses and perfect for all skill levels.';
  }
  if (msg.includes('trending') || msg.includes('popular')) {
    return 'Right now, the hottest topics are: Digital Illustration, UI/UX portfolios, and Blender sculpting. Lots of great posts in the Concept Forge community too! 🔥';
  }
  if (msg.includes('community') || msg.includes('find')) {
    return 'Based on your interests, I\'d suggest joining "Pixel & Ink" for illustration and "UI Craft Collective" for design. Both are super active! ✨';
  }
  if (msg.includes('started') || msg.includes('beginner') || msg.includes('new')) {
    return 'Welcome to StudioSquad! 🎨 Start with the "Color Theory for Digital Artists" course — it\'s free, beginner-friendly, and builds a solid foundation for any creative path.';
  }
  if (msg.includes('help')) {
    return 'I can help you find courses, discover communities, get feedback on your work, or just chat about creative stuff. What would you like to explore? 🌟';
  }
  if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
    return 'Hey! 🎨 Always great to chat with a fellow creative. What\'s on your mind today?';
  }

  // Default fallback reply
  return 'That\'s interesting! I\'m still learning, but I\'d suggest exploring the Explore feed or browsing our community posts for inspiration. Want me to suggest something specific? 🌟';
};

/* ─── MAIN CHATBOT COMPONENT ────────────────────────────────────── */
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll to bottom when messages update
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  /* ── Send a user message ── */
  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: text.trim(),
      time: 'Just now',
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate bot thinking delay (800ms – 1400ms)
    const delay = 800 + Math.random() * 600;

    setTimeout(() => {
      const botMsg = {
        id: `b-${Date.now()}`,
        role: 'bot',
        text: getBotReply(text),
        time: 'Just now',
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, delay);
  };

  /* ── Handle Enter key ── */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="chatbot-trigger">

      {/* ── Chat window (visible when isOpen) ── */}
      {isOpen && (
        <div className="chatbot-window">

          {/* Header */}
          <div className="chat-header">
            <div className="chat-avatar">🎨</div>
            <div className="chat-header-text">
              <h3>Muse</h3>
              <p>Your creative AI assistant</p>
            </div>
            <button
              className="chat-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X size={13} />
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-msg ${msg.role}`}>
                <div className="chat-bubble">{msg.text}</div>
                <div className="chat-time">{msg.time}</div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="chat-msg bot">
                <div className="typing-indicator">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies (show only when no conversation yet) */}
          {messages.length <= 1 && (
            <div className="quick-replies">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  className="quick-reply-chip"
                  onClick={() => sendMessage(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input area */}
          <div className="chat-input-area">
            <input
              type="text"
              className="chat-input"
              placeholder="Ask Muse anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="chat-send-btn"
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ── Floating trigger button ── */}
      <button
        className="chatbot-btn"
        onClick={() => setIsOpen(prev => !prev)}
        aria-label="Open creative assistant"
      >
        {isOpen ? <X size={20} /> : <Sparkles size={20} />}
        {/* Green "online" dot */}
        {!isOpen && <span className="chatbot-dot" />}
      </button>
    </div>
  );
};

export default Chatbot;
