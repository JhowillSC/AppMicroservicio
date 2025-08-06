const express = require('express');
const axios = require('axios');
const app = express();

// Ruta opcional para que / no dé error
app.get('/', (req, res) => {
    res.send('Microservicio funcionando. Usa /convertir?cantidad=100&moneda=USD');
});

app.get('/convertir', async (req, res) => {
    const cantidad = req.query.cantidad || 100;
    const moneda = req.query.moneda || 'USD';

    try {
        const response = await axios.get(`https://convertidormonedaz-bmffhfdxfwdebvdc.brazilsouth-01.azurewebsites.net/api/convertirMoneda?cantidad=${cantidad}&monedaDestino=${moneda}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error al llamar a la Azure Function:', error.message);
        res.status(500).send("Error al convertir moneda.");
    }
});

app.listen(3000, () => {
    console.log('Microservicio escuchando en http://localhost:3000');
});
