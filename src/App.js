import React, { useState } from 'react';
import { BrowserRouter as Routes, Route, useNavigate } from 'react-router-dom';
import "./App.css";
import AuthForm from './components/AuthForm';
import ChatWindow from './components/ChatWindow';

function App() {
  const [authData, setAuthData] = useState(null); 
  const navigate = useNavigate();

  const handleAuth = (credentials) => {
    setAuthData(credentials); 
    const { idInstance } = credentials;
    navigate(`/chat/${idInstance}`); 
  };

  return (
      <Routes>
        <Route path="/" element={<AuthForm onAuth={handleAuth} />} />
        <Route
          path="/chat/:id"
          element={
            authData ? (
              <ChatWindow 
                idInstance={authData.idInstance} 
                apiTokenInstance={authData.apiTokenInstance} 
              />
            ) : (
              <div>Пожалуйста, авторизуйтесь</div>
            )
          }
        />
      </Routes>
  );
}

export default App;