/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { ReactNode, useState, useRef, useEffect } from 'react';
import './Chatbot.scss';

type TProps = {
  tooltip: string;
  children: ReactNode;
};

const intents = {
  greetings: {
    patterns: ['hello', 'hi', 'hey','wassup','sup','greetings'],
    responses: ['Hello!', 'Hi there!', 'Hey! How can I assist you?']
  },
  help: {
    patterns: ['help', 'support', 'assistance'],
    responses: ['Sure, I\'m here to help!', 'What do you need assistance with?', 'I\'m here to assist you.']
  },
  bye: {
    patterns: ['bye', 'goodbye', 'exit','quit','logout'],
    responses: ['Goodbye!', 'Have a great day!', 'See you later!']
  },
  contact: {
    patterns: ['contact', 'phone', 'email','operator','support','live'],
    responses: ['You can contact Ernie through the contact section of the site, or email ernie@erniejohnson.ca']
  },
  feedback: {
    patterns: ['feedback','comments','comment'],
    responses: ['Your feedback will be valuable! Share your thoughts and suggestions in the "contact" section!']
  },
  codeSkills: {
    patterns: ['coding skills', 'skills', 'frameworks', 'libraries','languages'],
    responses: ['Ernie has experience in Javascript, Typescript, React, NextJS, C, C++, PHP, Perl and more. Is there something more specific you need?']
  },
  hackAttempt: {
    patterns: ['<script>', '<link>', '<iframe>','${',],
    responses: ['Ernie has experience in cybersecurity for applications. This attack has been blocked!']
  },
  usersName: {
    patterns: ['name'],
    responses: ['Your name is ${userName}']
  },
  default: {
    responses: ["I'm sorry, I don't understand that.", "Could you please rephrase that?", "I'm not sure how to help with that."]
  }
};

function getResponse(message) {
  const lowerMessage = message.toLowerCase();

  for (const intentName in intents) {
    const intent = intents[intentName];
    for (const pattern of intent.patterns || []) {
      if (lowerMessage.includes(pattern)) {
        return getRandomResponse(intent.responses);
      }
    }
  }

  return getRandomResponse(intents.default.responses);
}

function getRandomResponse(responses) {
  return responses[Math.floor(Math.random() * responses.length)];
}


//
// main Chatbot() system
//
function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);
  const [userName, setUserName] = useState('');

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleSendMessage = () => {
    if (userInput.trim() == '' && !userName) {
      // addMessage('Bot', `What is your name?`);
      return;
    }
    if (userInput.trim() !== '') {
      if(!userName) {
        setUserName(userInput);
        addMessage('Bot', `Hi ${userInput}! How can I assist you today?`);
      } else {
        addMessage('User', userInput);
        const botResponse = getResponse(userInput);
        addMessage('Bot', botResponse);
      }
      setUserInput('');
    }
  };

  const addMessage = (sender, message) => {
    setMessageHistory((prevHistory) => [
      ...prevHistory,
      { sender, message }
    ]);
  };
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messageHistory]);
  
  useEffect(() => {
    addMessage('Bot', `ue What is your name?`);
  }, []);

  return (
    <div className={`chatbot-popup ${isOpen ? 'open' : ''}`}>
      <div className="chatbot-content"> 
      <div className="chatbot-header">
        <div className="title">ChatterBot</div>
        <button className="close-button" onClick={toggleChatbot}>Close</button>
      </div>
      <div className="message-history">
        {messageHistory.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.sender === 'Bot' && (
              <div className="avatar-circle">
                {/* You can place an image tag or an icon here */}
                
                <i className="fa-solid fa-robot"></i>
              </div>
            )}
            <div className="message-content">{msg.message}</div>
          </div>
        ))}
        <div ref={messagesEndRef}></div> {/* This ensures scrolling to bottom */}
      </div>
      <div className="user-input">
        <input
          type="text"
          value={userInput}
          onChange={handleUserInput}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  </div>
  );
}

export default Chatbot;
