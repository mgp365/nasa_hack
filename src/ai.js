// ai.js
import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import * as cheerio from "cheerio";
import say from "say";

// Leer la API Key
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("Falta la variable de entorno GEMINI_API_KEY");
  process.exit(1);
}

// Inicializar modelo Gemini
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


// Función para cargar HTML como texto (solo la tabla principal)
async function cargarTablaHTMLComoTexto(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Seleccionamos solo la tabla principal de columnas
    const filas = [];
    $("table tbody tr").each((i, el) => {
      const celdas = $(el).find("td").map((i, td) => $(td).text().trim()).get();
      if (celdas.length) {
        filas.push(`Variable: ${celdas[0]}, Descripción: ${celdas[1]}`);
      }
    });

    return filas.join("\n");
  } catch (error) {
    console.error("Error al cargar el HTML:", error);
    return "";
  }
}

// Función principal con modos
async function preguntar(pregunta, modo = "aprendizaje", tts) {
  const htmlTexto = await cargarTablaHTMLComoTexto(
    "https://exoplanetarchive.ipac.caltech.edu/docs/API_kepcandidate_columns.html"
  );

  let prompt = "";
  
  if (modo === "aprendizaje") {
    prompt = `
Eres una astrofísica profesional con mucha experiencia en uso de bases de datos de la NASA, sobre todo la de la misión de KEPLER para detección de exoplanetas. 
Tu tarea es explicar de manera sencilla y clara, con ejemplos y referencias adicionales cuando sea necesario, basándote en la documentación HTML provista, manteniendo la seriedad necesaria con un ambient propicio para el aprendizaje del estudiante.

---DOCUMENTACIÓN HTML---
${htmlTexto}
-------------------

Explica de forma comprensible y didáctica:
"${pregunta}"
`;
  } else if (modo === "asistencia") {
    prompt = `
Eres un asistente experto en astronomía y bases de datos de la NASA (sobre todo entendimiento de bases de datos de la misión espacial KEPLER para detección de exoplanetas) para investigadores. 
Tu tarea es entregar información precisa y objetiva, compacta y directa, basándote únicamente en la documentación HTML provista.

---DOCUMENTACIÓN HTML---
${htmlTexto}
-------------------

Proporciona la respuesta a la siguiente solicitud de forma profesional:
"${pregunta}"
`;
  } else {
    console.error("Modo no reconocido. Usa 'aprendizaje' o 'asistencia'.");
    return;
  }

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    console.log(`\nRespuesta (modo ${modo}):\n`, response);

    //Generar TTS solo si tts = true que va a ser con un botón para activarlo, si se mantiene activado como un switch en la interfaz se genera y reproduce, si no no
    if (tts) {
      say.export(response, "Microsoft Zira Desktop", 1.0, "respuesta.wav", (err) => {
        if (err) return console.error("Error generando TTS:", err);
        console.log("✅ Audio generado: respuesta.wav");
      });
    }
  } catch (error) {
    console.error("Error generando respuesta con Gemini:", error);
  }

}

// Ejemplos
preguntar("Explica la variable koi duration", "aprendizaje", true);
preguntar("Explica la variable koi duration", "asistencia", true);
