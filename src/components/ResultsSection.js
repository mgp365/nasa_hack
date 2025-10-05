import React from 'react';
import { Calendar, Database, ExternalLink, Loader2 } from 'lucide-react';
import './ResultsSection.css';

const ResultsSection = ({ results, isLoading, searchQuery }) => {
  if (isLoading) {
    return (
      <section className="results-section">
        <div className="loading-container">
          <Loader2 className="loading-spinner" size={48} />
          <h3>Buscando en la base de datos de la NASA...</h3>
          <p>Esto puede tomar unos momentos</p>
        </div>
      </section>
    );
  }

  if (!searchQuery) {
    return (
      <section className="results-section">
        <div className="welcome-message">
          <Database size={64} />
          <h3>Explora el Universo</h3>
          <p>Ingresa un término de búsqueda para comenzar a explorar la base de datos de la NASA</p>
        </div>
      </section>
    );
  }

  if (results.length === 0) {
    return (
      <section className="results-section">
        <div className="no-results">
          <Database size={64} />
          <h3>No se encontraron resultados</h3>
          <p>No se encontraron resultados para "{searchQuery}". Intenta con otros términos de búsqueda.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="results-section">
      <div className="results-header">
        <h3>Resultados para "{searchQuery}"</h3>
        <p>{results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}</p>
      </div>
      
      <div className="results-grid">
        {results.map((result) => (
          <div key={result.id} className="result-card">
            <div className="result-image">
              <img src={result.image} alt={result.title} />
              <div className="result-type-badge">
                {result.type}
              </div>
            </div>
            
            <div className="result-content">
              <h4>{result.title}</h4>
              <p>{result.description}</p>
              
              <div className="result-meta">
                <div className="result-date">
                  <Calendar size={14} />
                  <span>{result.date}</span>
                </div>
                
                <button className="result-link">
                  <ExternalLink size={14} />
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResultsSection;

