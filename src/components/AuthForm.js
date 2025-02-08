import React, { useState } from 'react';
import PropTypes from 'prop-types'; 

const AuthForm = ({ onAuth }) => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!idInstance || !apiTokenInstance) {
      console.error('Please fill in all fields');
      return;
    }
    console.log('Form submitted!');
    if (typeof onAuth === 'function') {
      onAuth({ idInstance, apiTokenInstance });
    } else {
      console.error('onAuth is not a function');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <div className='form-group'>
        <input 
          type="text" 
          value={idInstance} 
          onChange={(e) => setIdInstance(e.target.value)} 
          placeholder="ID Instance" 
          required 
          className='form-input' 
        />
      </div>
      <div className='form-group'>
        <input 
          type="text" 
          value={apiTokenInstance} 
          onChange={(e) => setApiTokenInstance(e.target.value)} 
          placeholder="API Token Instance" 
          required 
          className='form-input' 
        />
      </div>
      <button type="submit" className='form-button'>Login</button>
    </form>
  );
};


AuthForm.propTypes = {
  onAuth: PropTypes.func.isRequired,
};

export default AuthForm;