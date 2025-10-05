import React, { useState } from 'react';
import './ChatSidebar.css';
import { askGemini } from '../ai';

const ChatSidebar = ({ open, onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hola, soy tu asistente de ExoHunters. ¿En qué te ayudo?' }
  ]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('aprendizaje');
  const [voice, setVoice] = useState(false);
  const [wide, setWide] = useState(false);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    try {
      const reply = await askGemini(text, mode, voice);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Hubo un error generando la respuesta.' }]);
    }
  };

  return (
    <aside className={`chat-sidebar ${open ? 'open' : ''} ${wide ? 'wide' : ''}`}>
      <div className="chat-header">
        <strong>Asistente ExoHunters</strong>
        <button className="chat-close" onClick={onClose} aria-label="Cerrar">
          ×
        </button>
        <button className="chat-expand" onClick={() => setWide(w => !w)} aria-label="Expandir/Contraer">
          {wide ? '↔' : '⤢'}
        </button>
      </div>
      <div className="chat-body">
        {messages.map((m, idx) => (
          <div key={idx} className={`chat-message ${m.role}`}>
            <div className="bubble">{m.content}</div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <div style={{ display: 'flex', gap: 8, marginBottom: 8, width: '100%' }}>
          <button
            type="button"
            className="chat-toggle"
            onClick={() => setMode(prev => prev === 'aprendizaje' ? 'asistencia' : 'aprendizaje')}
          >
            Modo: {mode}
          </button>
          <button
            type="button"
            className="chat-toggle"
            onClick={() => setVoice(v => !v)}
          >
            Voz: {voice ? 'ON' : 'OFF'}
          </button>
        </div>
        <div className="chat-send-row">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu pregunta..."
          />
          <button onClick={handleSend}>Enviar</button>
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;


