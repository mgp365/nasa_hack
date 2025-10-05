const predictFromModel = async (features) => {
  try {
    const response = await fetch("https://abcd1234.ngrok.io/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ features }),
    });
    const data = await response.json();
    console.log("Respuesta del modelo:", data);
    return data;
  } catch (error) {
    console.error("Error al conectar con Colab:", error);
  }
};
