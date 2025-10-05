import React, { useState } from 'react';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import ResultsSection from './components/ResultsSection';
import Footer from './components/Footer';
import { nasaServices } from './services/nasaApi';
import './App.css';

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
