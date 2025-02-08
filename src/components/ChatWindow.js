import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatInput from './ChatInput'; 
import PropTypes from 'prop-types'; 

const ChatWindow = ({ idInstance, apiTokenInstance }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [messages, setMessages] = useState([]);

  const handlePhoneNumberSubmit = () => {
    if (phoneNumber.trim() !== '') {
      setIsModalOpen(false); 
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`);
      if (response.data) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'other', text: response.data.body.messageData.textMessageData.textMessage },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [idInstance, apiTokenInstance]);

  const handleSendMessage = async (message) => {
    await axios.post(`https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
      chatId: phoneNumber + '@c.us',
      message: message,
    });
    setMessages((prevMessages) => [...prevMessages, { sender: 'me', text: message }]);
  };

  return (
    <div className="chat-container">
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Введите ваш номер телефона</h2>
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button onClick={handlePhoneNumberSubmit} className='modal-button'>Подтвердить</button>
          </div>
        </div>
      )}
      {!isModalOpen && (
        <div className="chat-window">
          <ul className="chat-messages">
            {messages.map((msg, index) => (
              <li key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </li>
            ))}
          </ul>
          <ChatInput onSendMessage={handleSendMessage} /> 
        </div>
      )}
    </div>
  );
};

ChatWindow.propTypes = {
  idInstance: PropTypes.string.isRequired, 
  apiTokenInstance: PropTypes.string.isRequired,
};

export default ChatWindow;