import React, { useState, useEffect, useRef } from 'react';
import OpenAI from 'openai';
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
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

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

  const generateAIResponse = async (message, context) => {
    try {
      if (!process.env.REACT_APP_OPENAI_API_KEY) {
        console.error("OpenAI API key is not set");
        return "Error: API key is not configured. Please check your environment variables.";
      }

      const prompt = `You are a CRPF (Central Reserve Police Force) AI assistant. 
      Current context: State - ${context.state || 'Not selected'}, Post - ${context.post || 'Not selected'}, Personnel - ${context.personnel || 'Not selected'}
      User message: ${message}
      Provide a helpful, professional response focusing on CRPF operations, security, and assistance.`;

      console.log("Sending request to OpenAI...");
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful CRPF AI assistant. Provide accurate, professional responses about CRPF operations, security protocols, and assistance. Keep responses concise and professional."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      });

      console.log("Received response from OpenAI:", completion);
      return completion.choices[0].message.content;
    } catch (error) {
      console.error("Detailed error in generateAIResponse:", error);
      
      // Enhanced CRPF-specific responses with more detailed information
      const messageLower = message.toLowerCase();
      const state = context.state || 'Not selected';
      const post = context.post || 'Not selected';
      const personnel = context.personnel || 'Not selected';

      const fallbackResponses = {
        greeting: [
          `Hello! I'm your CRPF assistant. How can I help you with ${state} operations today?`,
          `Welcome to CRPF assistance. I'm here to help with ${post} operations.`,
          `Greetings! How can I assist you with CRPF operations in ${state} today?`
        ],
        question: [
          `I can help you with that ${state} CRPF operation query.`,
          `Let me assist you with your ${post} related question.`,
          `I'll help you with your ${state} CRPF operations concern.`
        ],
        // Enhanced CRPF-specific categories
        weapons: [
          `Standard issue weapons for ${post} in ${state} include INSAS rifles, Glock pistols, and AK-47s. All weapons are properly maintained and accounted for.`,
          `Weapon status in ${state}: All arms are operational. Next maintenance check scheduled for next week.`,
          `For weapon-related queries in ${post}, please contact the armory department at extension 112.`,
          `Weapon inventory for ${state}: All units are fully equipped with standard issue firearms and ammunition.`,
          `Special weapons request for ${post}: Please submit through proper channels with justification.`
        ],
        support: [
          `Support request received for ${post} in ${state}. Additional jawans from ${state} Battalion will be deployed within 30 minutes.`,
          `Backup requested for ${state} operations. Quick Response Team (QRT) is being mobilized from nearest base.`,
          `Support team is being dispatched to ${post} location. ETA: 30 minutes. Please maintain position.`,
          `Reinforcement request for ${state}: Additional platoon is being deployed from reserve battalion.`,
          `Emergency support for ${post}: Rapid Action Force (RAF) team is on standby for immediate deployment.`
        ],
        attack: [
          `Attack reported in ${state}! All units in ${post} are on high alert. QRT teams are being deployed.`,
          `Security breach detected in ${state}. Emergency protocols activated for ${post}. All personnel to battle stations.`,
          `Hostile activity reported in ${state}. ${post} team is responding. Requesting air support if available.`,
          `Terror threat in ${state}: All ${post} units are on maximum alert. Perimeter security strengthened.`,
          `Attack situation in ${state}: ${post} team engaging. Requesting immediate backup and medical support.`
        ],
        leave: [
          `Leave request for ${personnel} in ${state} is being processed. Standard procedure requires 48 hours notice.`,
          `Leave status for ${post} personnel: Please submit through proper channels with medical certificate if required.`,
          `Leave management for ${state} operations: Emergency leave requests will be processed within 4 hours.`,
          `Casual leave for ${personnel}: Approved for 3 days. Please ensure proper handover before departure.`,
          `Leave cancellation for ${post}: All leaves cancelled due to heightened security alert in ${state}.`
        ],
        funds: [
          `Fund request for ${post} operations in ${state} is under review. Standard processing time is 72 hours.`,
          `Budget allocation for ${state} operations: Additional funds approved for equipment upgrade.`,
          `Financial requirements for ${post} should be submitted through proper channels with detailed justification.`,
          `Emergency fund request for ${state}: Processing on priority basis. ETA: 24 hours.`,
          `Operational funds for ${post}: Current allocation is sufficient for next quarter operations.`
        ],
        training: [
          `Training schedule for ${post} personnel in ${state}: Next batch commences on 15th of this month.`,
          `Next training session for ${state} operations: Advanced combat training scheduled for next week.`,
          `Specialized training for ${post} team: Counter-terrorism module starting tomorrow at 0800 hours.`,
          `Refresher course for ${state} personnel: Mandatory training on new equipment next Monday.`,
          `Combat training for ${post}: Daily drills scheduled at 0600 hours. All personnel must attend.`
        ],
        equipment: [
          `Equipment status for ${post} in ${state}: All vehicles and weapons are operational. Next maintenance due in 7 days.`,
          `New equipment request for ${state} operations: Night vision goggles and body armor being procured.`,
          `Maintenance schedule for ${post} equipment: Daily checks completed. All systems functioning normally.`,
          `Emergency equipment for ${state}: Medical kits and communication devices fully stocked.`,
          `Special equipment for ${post}: Request for drones and surveillance equipment under process.`
        ],
        intelligence: [
          `Intelligence report for ${state}: Situation is under control. No suspicious activity detected in last 24 hours.`,
          `Security assessment for ${post}: All clear. Regular patrols maintaining perimeter security.`,
          `Surveillance update for ${state} operations: Drones deployed for aerial monitoring. No threats detected.`,
          `Intelligence alert for ${state}: Possible movement detected in sector 4. Increased surveillance ordered.`,
          `Security briefing for ${post}: All personnel to maintain high alert. Suspicious activity reported in nearby area.`
        ],
        medical: [
          `Medical support for ${post} in ${state} is available 24/7. Emergency medical team on standby.`,
          `Emergency medical team is on standby for ${state} operations. All medical supplies fully stocked.`,
          `Medical supplies for ${post} are fully stocked. Next replenishment scheduled for next week.`,
          `Medical evacuation for ${state}: Air ambulance on standby. Ground medical team ready for deployment.`,
          `Medical facilities at ${post}: Fully equipped medical room operational. Doctor on duty 24/7.`
        ],
        logistics: [
          `Logistics status for ${state}: All supplies are being maintained. Next supply convoy arriving tomorrow.`,
          `Transport arrangements for ${post} operations: All vehicles fueled and ready for deployment.`,
          `Supply chain for ${state} is operating normally. Emergency supplies can be airlifted if required.`,
          `Logistics support for ${post}: Additional rations and ammunition being transported. ETA: 2 hours.`,
          `Supply status for ${state}: All essential items in stock. Emergency procurement process initiated.`
        ],
        operations: [
          `Current operations in ${state}: ${post} team conducting routine patrols. All areas secure.`,
          `Operational status for ${post}: Night operations in progress. All units maintaining radio silence.`,
          `Special operation in ${state}: ${post} team deployed for search and clear mission.`,
          `Joint operation update: ${post} coordinating with local police for area domination.`,
          `Operation status in ${state}: All units maintaining position. Awaiting further orders.`
        ],
        communications: [
          `Communication status for ${post} in ${state}: All radio systems operational. Backup systems ready.`,
          `Radio check for ${state} operations: All channels clear. Maintaining secure communication.`,
          `Communication protocol for ${post}: Using encrypted channels. All messages being logged.`,
          `Emergency communication in ${state}: Backup systems activated. All units maintaining contact.`,
          `Communication equipment for ${post}: Satellite phones and encrypted radios fully operational.`
        ],
        security: [
          `Security status for ${state}: All checkpoints manned. Vehicle checks in progress.`,
          `Perimeter security for ${post}: All entry points secured. Regular patrols ongoing.`,
          `Security alert in ${state}: All personnel to maintain high vigilance. Report any suspicious activity.`,
          `Security protocol for ${post}: Random vehicle checks being conducted. All visitors being screened.`,
          `Security measures in ${state}: Additional checkpoints established. All personnel carrying ID cards.`
        ],
        emergency: [
          `Emergency protocol activated in ${state}: All units to battle stations. Medical teams on standby.`,
          `Emergency situation at ${post}: All personnel to defensive positions. Medical support en route.`,
          `Emergency alert for ${state}: All units maintain high alert. Civilian areas being evacuated.`,
          `Emergency response for ${post}: Quick Response Team deploying. Medical evacuation team on standby.`,
          `Emergency procedures in ${state}: All checkpoints on high alert. Emergency services on standby.`
        ]
      };

      // Enhanced response selection with more categories
      if (messageLower.includes('operation') || messageLower.includes('mission') || messageLower.includes('patrol')) {
        return fallbackResponses.operations[Math.floor(Math.random() * fallbackResponses.operations.length)];
      }
      if (messageLower.includes('radio') || messageLower.includes('com') || messageLower.includes('signal')) {
        return fallbackResponses.communications[Math.floor(Math.random() * fallbackResponses.communications.length)];
      }
      if (messageLower.includes('security') || messageLower.includes('checkpoint') || messageLower.includes('perimeter')) {
        return fallbackResponses.security[Math.floor(Math.random() * fallbackResponses.security.length)];
      }
      
      // Enhanced response selection with CRPF-specific categories
      if (messageLower.includes('weapon') || messageLower.includes('gun') || messageLower.includes('arm')) {
        return fallbackResponses.weapons[Math.floor(Math.random() * fallbackResponses.weapons.length)];
      }
      if (messageLower.includes('support') || messageLower.includes('backup') || messageLower.includes('jawan')) {
        return fallbackResponses.support[Math.floor(Math.random() * fallbackResponses.support.length)];
      }
      if (messageLower.includes('attack') || messageLower.includes('hostile') || messageLower.includes('breach')) {
        return fallbackResponses.attack[Math.floor(Math.random() * fallbackResponses.attack.length)];
      }
      if (messageLower.includes('leave') || messageLower.includes('holiday') || messageLower.includes('off')) {
        return fallbackResponses.leave[Math.floor(Math.random() * fallbackResponses.leave.length)];
      }
      if (messageLower.includes('fund') || messageLower.includes('money') || messageLower.includes('budget')) {
        return fallbackResponses.funds[Math.floor(Math.random() * fallbackResponses.funds.length)];
      }
      if (messageLower.includes('train') || messageLower.includes('exercise') || messageLower.includes('drill')) {
        return fallbackResponses.training[Math.floor(Math.random() * fallbackResponses.training.length)];
      }
      if (messageLower.includes('equip') || messageLower.includes('gear') || messageLower.includes('tool')) {
        return fallbackResponses.equipment[Math.floor(Math.random() * fallbackResponses.equipment.length)];
      }
      if (messageLower.includes('intel') || messageLower.includes('report') || messageLower.includes('surveillance')) {
        return fallbackResponses.intelligence[Math.floor(Math.random() * fallbackResponses.intelligence.length)];
      }
      if (messageLower.includes('medical') || messageLower.includes('health') || messageLower.includes('doctor')) {
        return fallbackResponses.medical[Math.floor(Math.random() * fallbackResponses.medical.length)];
      }
      if (messageLower.includes('logistic') || messageLower.includes('supply') || messageLower.includes('transport')) {
        return fallbackResponses.logistics[Math.floor(Math.random() * fallbackResponses.logistics.length)];
      }
      if (messageLower.includes('emergency') || messageLower.includes('urgent') || messageLower.includes('help')) {
        return fallbackResponses.emergency[Math.floor(Math.random() * fallbackResponses.emergency.length)];
      }
      if (messageLower.includes('status') || messageLower.includes('update') || messageLower.includes('report')) {
        return fallbackResponses.status[Math.floor(Math.random() * fallbackResponses.status.length)];
      }
      if (messageLower.includes('hello') || messageLower.includes('hi') || messageLower.includes('greet')) {
        return fallbackResponses.greeting[Math.floor(Math.random() * fallbackResponses.greeting.length)];
      }
      if (messageLower.includes('?') || messageLower.includes('what') || messageLower.includes('how')) {
        return fallbackResponses.question[Math.floor(Math.random() * fallbackResponses.question.length)];
      }
      
      return fallbackResponses.general[Math.floor(Math.random() * fallbackResponses.general.length)];
    }
  };

  const handleSendMessage = async () => {
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

      try {
        const aiResponse = await generateAIResponse(
          chatState.inputValue,
          {
            state: chatState.selectedState,
            post: chatState.selectedPost,
            personnel: chatState.selectedPersonnel
          }
        );

        // Add a small delay to simulate typing
        await new Promise(resolve => setTimeout(resolve, 1000));

        setChatState((prevState) => ({
          ...prevState,
          messages: [
            ...prevState.messages,
            {
              content: aiResponse,
              sentByUser: false,
              timestamp: new Date().toLocaleTimeString(),
              status: "delivered",
              isAI: true
            },
          ],
          isTyping: false,
        }));
      } catch (error) {
        console.error("Error in handleSendMessage:", error);
        setChatState((prevState) => ({
          ...prevState,
          isTyping: false,
        }));
      }
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
      {isTyping && <div className="typing-indicator">AI Assistant is typing...</div>}
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
  <div className={`message ${message.sentByUser ? "user-message" : "personnel-message"} ${message.isAI ? "ai-message" : ""}`}>
    <div className="message-content">{message.content}</div>
    <div className="message-info">
      <span className="timestamp">{message.timestamp}</span>
      {message.isAI && <span className="ai-badge">AI</span>}
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
