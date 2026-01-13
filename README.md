# ExoHunters - NASA Database Search

Una aplicación web minimalista desarrollada en React que permite a científicos y estudiantes novatos buscar información de la base de datos de la NASA.

## 🚀 Características

- **Diseño Minimalista**: Interfaz limpia y moderna inspirada en el espacio
- **Búsqueda en Tiempo Real**: Integración con la API oficial de la NASA
- **Múltiples Fuentes de Datos**:
  - Astronomy Picture of the Day (APOD)
  - Asteroides cercanos a la Tierra
  - Fotos del Mars Rover
  - Exoplanetas
  - Imágenes de la Tierra
- **Responsive Design**: Optimizado para dispositivos móviles y desktop
- **Interfaz Intuitiva**: Fácil de usar para científicos y estudiantes

## 🛠️ Tecnologías Utilizadas

- **React 18**: Framework principal
- **CSS3**: Estilos personalizados con gradientes y efectos modernos
- **Axios**: Cliente HTTP para las llamadas a la API
- **Lucide React**: Iconos modernos y minimalistas
- **NASA API**: Base de datos oficial de la NASA

## 📦 Instalación

1. **Clona el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd nasa_web
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Inicia la aplicación**:
   ```bash
   npm start
   ```

4. **Abre tu navegador** y ve a la siguiente liga `http://localhost:3000`

## 🔑 Configuración de la API de la NASA

Para obtener una clave API de la NASA:

1. Ve a [api.nasa.gov](https://api.nasa.gov/)
2. Completa el formulario para obtener tu clave API gratuita
3. Reemplaza `DEMO_KEY` en `src/services/nasaApi.js` con tu clave personal

```javascript
const API_KEY = 'TU_CLAVE_API_AQUI';
```

## 🎨 Características del Diseño

- **Paleta de Colores**: Gradientes azul-púrpura inspirados en el espacio
- **Tipografía**: Inter font para una apariencia moderna y legible
- **Efectos Visuales**: Backdrop blur, sombras y transiciones suaves
- **Iconografía**: Iconos de Lucide React para una experiencia consistente

## 📱 Responsive Design

La aplicación está optimizada para:
- **Desktop**: Experiencia completa con grid de resultados
- **Tablet**: Layout adaptativo con navegación optimizada
- **Mobile**: Interfaz táctil con componentes apilados

## 🔍 Tipos de Búsqueda Disponibles

1. **Todos los datos**: Búsqueda general en múltiples fuentes
2. **Imagen del día**: Astronomy Picture of the Day
3. **Asteroides**: Objetos cercanos a la Tierra
4. **Exoplanetas**: Planetas fuera del sistema solar
5. **Marte**: Fotos del Mars Rover

## 🚀 Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo
- `npm build`: Construye la aplicación para producción
- `npm test`: Ejecuta las pruebas
- `npm eject`: Expone la configuración de Create React App

## 📄 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Header.js       # Encabezado con logo y descripción
│   ├── SearchSection.js # Sección de búsqueda
│   ├── ResultsSection.js # Resultados de búsqueda
│   └── Footer.js       # Pie de página
├── services/           # Servicios de API
│   └── nasaApi.js     # Integración con NASA API
├── App.js             # Componente principal
├── App.css            # Estilos principales
├── index.js           # Punto de entrada
└── index.css          # Estilos globales
```

## 🌟 Próximas Características

- [ ] Filtros avanzados de búsqueda
- [ ] Favoritos y historial de búsquedas
- [ ] Modo oscuro/claro
- [ ] Exportación de resultados
- [ ] Notificaciones de nuevos datos
- [ ] Integración con más APIs de la NASA

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [NASA](https://www.nasa.gov/) por proporcionar acceso gratuito a sus datos
- [NASA API](https://api.nasa.gov/) por la documentación y endpoints
- [Lucide](https://lucide.dev/) por los iconos
- [Unsplash](https://unsplash.com/) por las imágenes de ejemplo

---

**Desarrollado con ❤️ para la exploración espacial y la educación científica**
