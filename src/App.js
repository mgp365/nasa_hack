import React, { useState } from 'react';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import ResultsSection from './components/ResultsSection';
import Footer from './components/Footer';
import { nasaServices } from './services/nasaApi';
import './App.css';


// AQUÍ DEBE AGARRAR DATOS KOI_DATA.CVS Y MOSTRAR UNO DE EJEMPLO
// QUE EL USUARIO PUEDA METER TODOS LOS DATOS DEL QUE BUSCA EN CADA CASILLA DE DATO
// NO IMPORTA SI NO SE LLENAN, VA A BUSCAR EN COMÚN CON LAS FILAS QUE SÍ TIENEN IGUALES
function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (query, searchType) => {
    setSearchQuery(query);
    setIsLoading(true);
    
    try {
      const results = await nasaServices.searchNASA(query, searchType);
      setSearchResults(results);
    } catch (error) {
      console.error('Error en la búsqueda:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <SearchSection onSearch={handleSearch} />
        <ResultsSection 
          results={searchResults} 
          isLoading={isLoading}
          searchQuery={searchQuery}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
