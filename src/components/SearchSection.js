import React, { useState } from 'react';
import { Search, Filter, Database } from 'lucide-react';
import './SearchSection.css';

const SearchSection = ({ onSearch }) => {
  const [filters, setFilters] = useState([{ column: 'koi_name', query: '' }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const normalized = filters
      .map(f => ({ column: f.column, query: String(f.query || '').trim() }))
      .filter(f => f.query.length > 0);
    onSearch(normalized);
  };

  // Subconjunto útil de columnas del catálogo KOI (Kepler Objects of Interest)
  const koiColumns = [
    { value: 'koi_name', label: 'KOI Name' },
    { value: 'kepid', label: 'Kepler ID' },
    { value: 'koi_disposition', label: 'Disposition' },
    { value: 'koi_pdisposition', label: 'Pred. Disposition' },
    { value: 'koi_period', label: 'Orbital Period (days)' },
    { value: 'koi_prad', label: 'Planet Radius (R⊕)' },
    { value: 'koi_smass', label: 'Stellar Mass (M☉)' },
    { value: 'koi_srad', label: 'Stellar Radius (R☉)' },
    { value: 'koi_teq', label: 'Equilibrium Temp (K)' }
  ];

  return (
    <section className="search-section">
      <div className="search-container">
        <div className="search-intro">
          <h2>Buscar Exoplanetas (KOI)</h2>
          <p>Filtra el catálogo de Kepler por columna y valor</p>
        </div>

        <form className="search-form" onSubmit={handleSubmit}>
          {filters.map((f, idx) => (
            <div key={idx} className="search-input-group">
              <div className="search-type-selector">
                <Filter className="filter-icon" size={16} />
                <select
                  value={f.column}
                  onChange={(e) => {
                    const next = [...filters];
                    next[idx] = { ...next[idx], column: e.target.value };
                    setFilters(next);
                  }}
                  className="search-type-select"
                >
                  {koiColumns.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="search-input-container">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  value={f.query}
                  onChange={(e) => {
                    const next = [...filters];
                    next[idx] = { ...next[idx], query: e.target.value };
                    setFilters(next);
                  }}
                  placeholder="Valor (ej. CONFIRMED, 10.5, K00070)"
                  className="search-input"
                />
              </div>

              {filters.length > 1 && (
                <button
                  type="button"
                  className="search-button"
                  onClick={() => setFilters(filters.filter((_, i) => i !== idx))}
                >
                  Eliminar
                </button>
              )}
            </div>
          ))}

          <div className="search-input-group">
            <button
              type="button"
              className="search-button"
              onClick={() => setFilters([...filters, { column: 'koi_name', query: '' }])}
            >
              Agregar filtro
            </button>

            <button type="submit" className="search-button">
              Buscar
            </button>
          </div>
        </form>
        
      </div>
    </section>
  );
};

export default SearchSection;

