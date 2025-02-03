import React, { useState } from 'react';

const AuthForm = ({ onAuth }) => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth({ idInstance, apiTokenInstance });
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

export default AuthForm;