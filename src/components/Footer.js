import React from 'react';
import { Globe, ExternalLink, Github } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <Globe size={24} />
              <span>ExoHunters</span>
            </div>
            <p>Explorando el universo a través de los datos de la NASA</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-section">
              <h4>Recursos</h4>
              <ul>
                <li>
                  <a href="https://api.nasa.gov/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={14} />
                    NASA API
                  </a>
                </li>
                <li>
                  <a href="https://www.nasa.gov/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={14} />
                    NASA.gov
                  </a>
                </li>
                <li>
                  <a href="https://science.nasa.gov/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={14} />
                    NASA Science
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Desarrollo</h4>
              <ul>
                <li>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github size={14} />
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={14} />
                    React
                  </a>
                </li>
                <li>
                  <a href="https://lucide.dev/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={14} />
                    Lucide Icons
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 ExoHunters. Desarrollado para la exploración espacial y la educación científica.</p>
          <p className="footer-note">
            Los datos mostrados provienen de la API pública de la NASA
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

