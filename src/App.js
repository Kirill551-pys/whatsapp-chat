import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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
    <Router basename= "/whatsapp-chat">
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
    </Router>
  );
}

export default App;