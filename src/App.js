import React, { useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import "./App.css";
import AuthForm from './components/AuthForm';
import ChatWindow from './components/ChatWindow';

function App() {
  const [authData, setAuthData] = useState(null); // Состояние для хранения данных аутентификации
  const navigate = useNavigate();

  // Функция для обработки аутентификации
  const handleAuth = (credentials) => {
    setAuthData(credentials); // Сохраняем данные аутентификации
    const { idInstance } = credentials;
    navigate(`/chat/${idInstance}`); // Перенаправляем на страницу чата
  };

  return (
    <Routes>
      {/* Маршрут для формы авторизации */}
      <Route path="/" element={<AuthForm onAuth={handleAuth} />} />

      {/* Маршрут для чата */}
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