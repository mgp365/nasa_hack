import Papa from 'papaparse';

let cachedKoiRows = null;

const loadKoiCsv = () => {
  return new Promise((resolve, reject) => {
    if (cachedKoiRows) {
      resolve(cachedKoiRows);
      return;
    }

    Papa.parse('/koi_data.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = Array.isArray(results.data) ? results.data : [];
        cachedKoiRows = rows;
        resolve(rows);
      },
      error: (err) => {
        reject(err);
      }
    });
  });
};

const mapRowToResult = (row, index) => {
  return {
    id: String(row.kepid || row.koi_name || index),
    row
  };
};

const searchNASA = async (filters) => {
  try {
    const rows = await loadKoiCsv();
    const activeFilters = Array.isArray(filters) ? filters.filter(f => (f.query ?? '') !== '') : [];

    if (activeFilters.length === 0) {
      return rows.slice(0, 12).map(mapRowToResult);
    }

    const filtered = rows.filter((row) => {
      for (const f of activeFilters) {
        const value = row[f.column];
        if (value === null || value === undefined) return false;
        const text = String(value).toLowerCase();
        const q = String(f.query).toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });

    const limited = filtered.slice(0, 24);
    return limited.map(mapRowToResult);
  } catch (error) {
    console.error('Error cargando/filtrando KOI CSV:', error);
    // Return a minimal example so UI can still render
    return [
      {
        id: 'example-1',
        row: { koi_name: 'K00000.01', koi_disposition: 'CANDIDATE' }
      }
    ];
  }
};

export const nasaServices = { searchNASA };


