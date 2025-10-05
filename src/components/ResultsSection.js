import React, { useMemo, useState } from 'react';
import { Database, Loader2 } from 'lucide-react';
import './ResultsSection.css';

const ResultsSection = ({ results, isLoading, searchQuery, filters = [] }) => {
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

  // Use all columns from the first result's row
  const allColumns = useMemo(() => (
    results.length > 0 && results[0].row ? Object.keys(results[0].row) : []
  ), [results]);

  const defaultEssential = useMemo(() => (
    ['kepid', 'koi_name', 'koi_disposition', 'koi_period', 'koi_prad'].filter(c => allColumns.includes(c))
  ), [allColumns]);

  const [selectedColumns, setSelectedColumns] = useState(defaultEssential);

  // Keep selectedColumns in sync if dataset changes
  React.useEffect(() => {
    if (!selectedColumns || selectedColumns.length === 0) {
      setSelectedColumns(defaultEssential);
    } else {
      // Remove columns that no longer exist
      const pruned = selectedColumns.filter(c => allColumns.includes(c));
      if (pruned.length !== selectedColumns.length) setSelectedColumns(pruned);
    }
  }, [allColumns, defaultEssential]);

  return (
    <section className="results-section">
      <div className="results-header">
        <h3>Resultados para "{searchQuery}"</h3>
        <p>{results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="results-controls" style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <strong>Columnas:</strong>
          <button type="button" className="search-button" onClick={() => setSelectedColumns(allColumns)} disabled={allColumns.length === 0}>
            Seleccionar todas
          </button>
          <button type="button" className="search-button" onClick={() => setSelectedColumns(defaultEssential)} disabled={defaultEssential.length === 0}>
            Esenciales
          </button>
          <button type="button" className="search-button" onClick={() => setSelectedColumns([])}>
            Limpiar
          </button>
        </div>
        <div style={{ maxHeight: 160, overflow: 'auto', border: '1px solid #e5e7eb', borderRadius: 8, padding: 8, marginTop: 8 }}>
          {allColumns.map(col => (
            <label key={col} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginRight: 12, marginBottom: 8 }}>
              <input
                type="checkbox"
                checked={selectedColumns.includes(col)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedColumns(prev => Array.from(new Set([...prev, col])));
                  } else {
                    setSelectedColumns(prev => prev.filter(c => c !== col));
                  }
                }}
              />
              <span>{col}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="results-table-wrapper">
        <table className="results-table">
          <thead>
            <tr>
              {selectedColumns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((res) => (
              <tr key={res.id}>
                {selectedColumns.map((col) => (
                  <td key={col}>{res.row && res.row[col] !== undefined ? String(res.row[col]) : ''}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ResultsSection;

