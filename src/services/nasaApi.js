import axios from 'axios';

// Configuración base para la API de la NASA
const NASA_API_BASE = 'https://api.nasa.gov';
const API_KEY = 'DEMO_KEY'; // En producción, usar una clave real

// Cliente axios configurado para la API de la NASA
const nasaApi = axios.create({
  baseURL: NASA_API_BASE,
  timeout: 10000,
  params: {
    api_key: API_KEY
  }
});

// Servicios para diferentes endpoints de la NASA
export const nasaServices = {
  // Astronomy Picture of the Day
  async getAPOD(date = null) {
    try {
      const params = date ? { date } : {};
      const response = await nasaApi.get('/planetary/apod', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching APOD:', error);
      throw error;
    }
  },

  // Near Earth Objects
  async getAsteroids(startDate, endDate) {
    try {
      const response = await nasaApi.get('/neo/rest/v1/feed', {
        params: {
          start_date: startDate,
          end_date: endDate
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching asteroids:', error);
      throw error;
    }
  },

  // Mars Rover Photos
  async getMarsPhotos(sol = 1000, camera = 'all') {
    try {
      const params = { sol };
      if (camera !== 'all') {
        params.camera = camera;
      }
      const response = await nasaApi.get('/mars-photos/api/v1/rovers/curiosity/photos', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching Mars photos:', error);
      throw error;
    }
  },

  // Earth Imagery
  async getEarthImagery(lat, lon, date = null) {
    try {
      const params = { lat, lon };
      if (date) {
        params.date = date;
      }
      const response = await nasaApi.get('/planetary/earth/imagery', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching Earth imagery:', error);
      throw error;
    }
  },

  // Exoplanet Archive (usando un endpoint simulado)
  async searchExoplanets(searchTerm) {
    try {
      // Simulación de búsqueda de exoplanetas
      // En una implementación real, esto conectaría con la base de datos de exoplanetas de la NASA
      const mockResults = [
        {
          id: 1,
          title: `Exoplaneta relacionado con "${searchTerm}"`,
          description: "Información detallada sobre un exoplaneta descubierto por la NASA.",
          date: new Date().toISOString().split('T')[0],
          type: 'exoplanet',
          image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop"
        }
      ];
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockResults;
    } catch (error) {
      console.error('Error searching exoplanets:', error);
      throw error;
    }
  },

  // Búsqueda general
  async searchNASA(query, searchType = 'all') {
    try {
      switch (searchType) {
        case 'apod':
          const apod = await this.getAPOD();
          return [{
            id: 1,
            title: apod.title,
            description: apod.explanation,
            date: apod.date,
            type: 'apod',
            image: apod.url
          }];
          
        case 'asteroids':
          const today = new Date().toISOString().split('T')[0];
          const asteroids = await this.getAsteroids(today, today);
          const asteroidList = Object.values(asteroids.near_earth_objects[today] || {});
          return asteroidList.slice(0, 5).map((asteroid, index) => ({
            id: index + 1,
            title: asteroid.name,
            description: `Asteroid with diameter: ${asteroid.estimated_diameter?.meters?.estimated_diameter_max?.toFixed(2)}m`,
            date: today,
            type: 'asteroid',
            image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400&h=300&fit=crop"
          }));
          
        case 'mars':
          const marsPhotos = await this.getMarsPhotos();
          return marsPhotos.photos.slice(0, 5).map((photo, index) => ({
            id: index + 1,
            title: `Mars Photo - Sol ${photo.sol}`,
            description: `Photo taken by ${photo.camera.full_name} on Mars`,
            date: photo.earth_date,
            type: 'mars',
            image: photo.img_src
          }));
          
        case 'exoplanets':
          return await this.searchExoplanets(query);
          
        default:
          // Búsqueda general - combinar resultados de diferentes fuentes
          const [apodResult, marsResult] = await Promise.all([
            this.getAPOD().catch(() => null),
            this.getMarsPhotos().catch(() => null)
          ]);
          
          const results = [];
          
          if (apodResult) {
            results.push({
              id: 1,
              title: apodResult.title,
              description: apodResult.explanation.substring(0, 200) + '...',
              date: apodResult.date,
              type: 'apod',
              image: apodResult.url
            });
          }
          
          if (marsResult && marsResult.photos.length > 0) {
            results.push({
              id: 2,
              title: `Mars Exploration - ${marsResult.photos[0].camera.full_name}`,
              description: `Latest images from Mars rover`,
              date: marsResult.photos[0].earth_date,
              type: 'mars',
              image: marsResult.photos[0].img_src
            });
          }
          
          return results;
      }
    } catch (error) {
      console.error('Error in NASA search:', error);
      throw error;
    }
  }
};

export default nasaServices;

