import React from 'react';
import { Search, Globe, MessageSquare } from 'lucide-react';
import './Header.css';

const Header = ({ onOpenChat }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <div className="logo-icon">
            <Globe size={32} />
          </div>
          <div className="logo-text">
            <h1>ExoHunters</h1>
            <p>NASA Database Search</p>
          </div>
        </div>
        
        <div className="header-description">
          <p>Bienvenido a ExoHunters</p>
          <span>Una plataforma donde científicos y estudiantes novatos pueden buscar información de la base de datos de la NASA</span>
        </div>
        
        <div className="actions">
          <div className="search-icon">
            <Search size={24} />
          </div>
          <button className="chat-icon" onClick={onOpenChat} aria-label="Abrir chat">
            <MessageSquare size={22} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

