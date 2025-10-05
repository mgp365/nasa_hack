// ai.js (browser)
// Provee askGemini(pregunta, modo, tts) usando @google/generative-ai en el navegador
// Usa REACT_APP_GEMINI_API_KEY o window.GEMINI_API_KEY

import { GoogleGenerativeAI } from "@google/generative-ai";

const getApiKey = () => {
  if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_GEMINI_API_KEY) {
    return process.env.REACT_APP_GEMINI_API_KEY;
  }
  if (typeof window !== 'undefined' && window.GEMINI_API_KEY) {
    return window.GEMINI_API_KEY;
  }
  return '';
};

const buildPrompt = (pregunta, modo, htmlTexto = '') => {
  if (modo === 'aprendizaje') {
    return `Eres una astrofísica profesional experta en la misión KEPLER y el catálogo KOI.
Explica de forma didáctica y clara basándote en la documentación (si está disponible).
\n---DOCUMENTACIÓN HTML---\n${htmlTexto}\n-------------------\n\nPregunta: ${pregunta}`;
  }
  return `Eres un asistente técnico en astronomía y bases de datos de la NASA (KEPLER/KOI).
Responde de forma precisa y concisa basándote en la documentación (si está disponible).
\n---DOCUMENTACIÓN HTML---\n${htmlTexto}\n-------------------\n\nSolicitud: ${pregunta}`;
};

async function fetchKoiColumnsDoc() {
  try {
    const res = await fetch('https://exoplanetarchive.ipac.caltech.edu/docs/API_kepcandidate_columns.html');
    const html = await res.text();
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    const text = tmp.innerText.replace(/\s+/g, ' ').trim();
    return text.slice(0, 3000);
  } catch (e) {
    return '';
  }
}

export async function askGemini(pregunta, modo = 'aprendizaje', tts = false) {
  const apiKey = getApiKey();
  if (!apiKey) {
    const msg = 'Configura REACT_APP_GEMINI_API_KEY para habilitar el asistente.';
    if (tts && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(msg));
    }
    return msg;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const htmlTexto = await fetchKoiColumnsDoc();
  const prompt = buildPrompt(pregunta, modo, htmlTexto);

    const result = await model.generateContent(prompt);
    const response = result.response.text();

  if (tts && typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(response));
  }
  return response;
}
