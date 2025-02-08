import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ChatInput({ onSendMessage }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Напишите сообщение..."
      />
      <button type="submit">Отправить</button>
    </form>
  );
}


ChatInput.propTypes = {
  onSendMessage: PropTypes.func.isRequired, 
};

export default ChatInput;