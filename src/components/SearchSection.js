import React, { useState } from 'react';
import { Search, Filter, Database } from 'lucide-react';
import './SearchSection.css';

const SearchSection = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('all');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), searchType);
    }
  };

  const searchTypes = [
    { value: 'all', label: 'Todos los datos', icon: Database },
    { value: 'apod', label: 'Imagen del día', icon: Database },
    { value: 'asteroids', label: 'Asteroides', icon: Database },
    { value: 'exoplanets', label: 'Exoplanetas', icon: Database },
    { value: 'mars', label: 'Marte', icon: Database }
  ];

  return (
    <section className="search-section">
      <div className="search-container">
        <div className="search-intro">
          <h2>Explora el Universo</h2>
          <p>Busca en la extensa base de datos de la NASA para encontrar información sobre planetas, asteroides, exoplanetas y más</p>
        </div>

        <form className="search-form" onSubmit={handleSubmit}>
          <div className="search-input-group">
            <div className="search-input-container">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar en la base de datos de la NASA..."
                className="search-input"
              />
            </div>
            
            <div className="search-type-selector">
              <Filter className="filter-icon" size={16} />
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="search-type-select"
              >
                {searchTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            
            <button type="submit" className="search-button">
              Buscar
            </button>
          </div>
        </form>

        <div className="search-suggestions">
          <p>Sugerencias de búsqueda:</p>
          <div className="suggestion-tags">
            {['Mars Rover', 'Hubble Telescope', 'International Space Station', 'Apollo Missions', 'Black Holes'].map((suggestion) => (
              <button
                key={suggestion}
                className="suggestion-tag"
                onClick={() => {
                  setQuery(suggestion);
                  onSearch(suggestion, searchType);
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;

