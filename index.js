const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // importante para recibir JSON si es necesario

// Página principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// API de conversión (devuelve solo JSON)
app.post("/convertir", async (req, res) => {
  const { cantidad, monedaOrigen, monedaDestino } = req.body;

  try {
    const response = await axios.get(
      `https://convertidormonedaz-bmffhfdxfwdebvdc.brazilsouth-01.azurewebsites.net/api/convertirMoneda?cantidad=${cantidad}&monedaDestino=${monedaDestino}`
    );
    const resultado = response.data.resultado;

    res.json({
      exito: true,
      mensaje: `Conversión realizada con éxito`,
      resultado: `${cantidad} ${monedaOrigen} equivale a ${resultado} ${monedaDestino}`,
    });
  } catch (error) {
    res.json({
      exito: false,
      mensaje: "Error al convertir moneda.",
    });
  }
});

app.listen(3000, () => {
  console.log("Microservicio escuchando en http://localhost:3000");
});
