import React, { useState } from 'react';
import "./App.css"
import AuthForm from './components/AuthForm';
import ChatWindow from './components/ChatWindow';

const App = () => {
  const [authData, setAuthData] = useState(null);

  const handleAuth = (data) => {
    setAuthData(data);
  };

  return (
    <div>
      {!authData ? (
        <AuthForm onAuth={handleAuth} />
      ) : (
        <ChatWindow idInstance={authData.idInstance} apiTokenInstance={authData.apiTokenInstance} />
      )}
    </div>
  );
};

export default App;
