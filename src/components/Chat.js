import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';

const states = [
  "Haryana",
  "Jammu & Kashmir",
  "Delhi",
  "Maharashtra",
  "Uttar Pradesh",
  "Rajasthan",
  "Madhya Pradesh",
  "Punjab",
  "West Bengal"
];

const posts = {
  "Haryana": ["Anti-Terror Operations", "Border Security", "Disaster Relief"],
  "Jammu & Kashmir": ["Counter-Terrorism", "VIP Security", "Border Surveillance"],
  "Delhi": ["Urban Policing", "Election Security", "Public Safety"],
  "Maharashtra": ["Naxal Operations", "Anti-Smuggling", "Community Outreach"],
  "Uttar Pradesh": ["Anti-Terror Operations", "Border Security", "Disaster Relief"],
  "Rajasthan": ["Desert Patrol", "Anti-Smuggling", "Community Outreach"],
  "Madhya Pradesh": ["Naxal Operations", "VIP Security", "Public Safety"],
  "Punjab": ["Counter-Terrorism", "Border Security", "Election Security"],
  "West Bengal": ["Counter-Terrorism", "Election Security", "Urban Policing"]
};

const personnelNames = {
  "Anti-Terror Operations": ["Rajesh Kumar", "Anita Sharma", "Vikram Singh"],
  "Border Security": ["Suresh Yadav", "Neha Patel", "Arjun Rao"],
  "Disaster Relief": ["Kiran Gupta", "Ravi Mehta", "Priya Desai"],
  "Counter-Terrorism": ["Ritesh Agarwal", "Suman Dubey", "Rajeev Kumar"],
  "VIP Security": ["Mohan Sharma", "Sonia Sinha", "Ravi Reddy"],
  "Public Safety": ["Pooja Rawat", "Gaurav Verma", "Sanjay Sharma"],
  "Naxal Operations": ["Sunil Kumar", "Rita Singh", "Ajay Patel"],
  "Anti-Smuggling": ["Deepak Kumar", "Sita Patel", "Rakesh Singh"],
  "Community Outreach": ["Chandan Sharma", "Nisha Mehta", "Kamal Singh"],
  "Urban Policing": ["Akash Patel", "Geeta Kumari", "Ramesh Yadav"],
  "Election Security": ["Anil Kumar", "Neeta Joshi", "Manoj Tiwari"],
  "Desert Patrol": ["Vijay Singh", "Aarti Yadav", "Sunita Rao"],
  "Border Surveillance": ["Karan Singh", "Meera Patel", "Raj Kumar"]
};

const Chat = () => {
  const [chatState, setChatState] = useState({
    selectedState: null,
    selectedPost: null,
    selectedPersonnel: null,
    messages: [],
    inputValue: "",
    isTyping: false,
    theme: "light",
  });

  const messagesEndRef = useRef(null); 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatState.messages]);

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('messages'));
    if (storedMessages) {
      setChatState((prevState) => ({
        ...prevState,
        messages: storedMessages,
      }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatState.messages));
  }, [chatState.messages]);

  const handleStateSelection = (state) => {
    setChatState((prevState) => ({
      ...prevState,
      selectedState: state,
      selectedPost: null,
      selectedPersonnel: null,
      messages: [],
    }));
  };

  const handlePostSelection = (post) => {
    setChatState((prevState) => ({
      ...prevState,
      selectedPost: post,
      selectedPersonnel: null,
    }));
  };

  const handlePersonnelSelection = (person) => {
    setChatState((prevState) => ({
      ...prevState,
      selectedPersonnel: person,
    }));
  };

  const handleSendMessage = () => {
    if (chatState.inputValue.trim()) {
      const newMessage = {
        content: chatState.inputValue,
        sentByUser: true,
        timestamp: new Date().toLocaleTimeString(),
        status: "sent",
      };
      const updatedMessages = [...chatState.messages, newMessage];
      setChatState((prevState) => ({
        ...prevState,
        messages: updatedMessages,
        inputValue: "",
        isTyping: true,
      }));

      // Simulate a reply from the post
      setTimeout(() => {
        setChatState((prevState) => ({
          ...prevState,
          messages: [
            ...prevState.messages,
            {
              content: "This is an automated reply.",
              sentByUser: false,
              timestamp: new Date().toLocaleTimeString(),
              status: "delivered",
            },
          ],
          isTyping: false,
        }));
      }, 1000);
    } else {
      alert("Message cannot be empty!");
    }
  };

  const handleInputChange = (e) => {
    setChatState((prevState) => ({
      ...prevState,
      inputValue: e.target.value,
    }));
  };

  const resetSelection = () => {
    setChatState({
      selectedState: null,
      selectedPost: null,
      selectedPersonnel: null,
      messages: [],
      inputValue: "",
      isTyping: false,
      theme: chatState.theme,
    });
  };

  

  return (
    <div className={`chat-app-container ${chatState.theme}`}>
      <header className="chat-header">
        <h1>CRPF Communication Portal</h1>
        {chatState.selectedState && (
          <button className="reset-button" onClick={resetSelection}>
            Back to States
          </button>
        )}
        
      </header>

      <div className="chat-main">
        {!chatState.selectedState ? (
          <Selector
            title="Select a State"
            options={states}
            onSelect={handleStateSelection}
          />
        ) : !chatState.selectedPost ? (
          <Selector
            title={`Select a Post in ${chatState.selectedState}`}
            options={posts[chatState.selectedState]}
            onSelect={handlePostSelection}
          />
        ) : !chatState.selectedPersonnel ? (
          <Selector
            title={`Select a Personnel for ${chatState.selectedPost}`}
            options={personnelNames[chatState.selectedPost]}
            onSelect={handlePersonnelSelection}
          />
        ) : (
          <ChatWindow
            personnel={chatState.selectedPersonnel}
            post={chatState.selectedPost}
            state={chatState.selectedState}
            messages={chatState.messages}
            inputValue={chatState.inputValue}
            isTyping={chatState.isTyping}
            onInputChange={handleInputChange}
            onSendMessage={handleSendMessage}
            messagesEndRef={messagesEndRef}
          />
        )}
      </div>
    </div>
  );
};

const Selector = ({ title, options, onSelect }) => (
  <div className="selector-container">
    <h2>{title}</h2>
    <div className="button-group">
      {options.map((option) => (
        <button key={option} onClick={() => onSelect(option)}>
          {option}
        </button>
      ))}
    </div>
  </div>
);

const ChatWindow = ({
  personnel,
  post,
  state,
  messages,
  inputValue,
  isTyping,
  onInputChange,
  onSendMessage,
  messagesEndRef
}) => (
  <div className="chat-window">
    <h2>
      Chatting with {personnel}, regarding {post} in {state}
    </h2>
    <div className="messages">
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
      {isTyping && <div className="typing-indicator">Personnel is typing...</div>}
      <div ref={messagesEndRef} />
    </div>
    <InputField
      inputValue={inputValue}
      onInputChange={onInputChange}
      onSendMessage={onSendMessage}
    />
  </div>
);

const Message = ({ message }) => (
  <div className={`message ${message.sentByUser ? "user-message" : "personnel-message"}`}>
    <div className="message-content">{message.content}</div>
    <div className="message-info">
      <span className="timestamp">{message.timestamp}</span>
      <span className="status">{message.status}</span>
    </div>
  </div>
);

const InputField = ({ inputValue, onInputChange, onSendMessage }) => (
  <div className="input-container">
    <input
      type="text"
      value={inputValue}
      onChange={onInputChange}
      placeholder="Type a message..."
      onKeyPress={(e) => {
        if (e.key === "Enter") onSendMessage();
      }}
    />
   <button className="chat-input-button" onClick={onSendMessage}>Send</button>

  </div>
);

export default Chat;
