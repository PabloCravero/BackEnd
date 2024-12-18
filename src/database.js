require('dotenv').config();
const mongoose = require('mongoose');

// Determinar la URL de la base de datos según el entorno
let dbURI;

if (process.env.NODE_ENV === 'test') {
    dbURI = process.env.TEST_DB_URL; 
} else {
    dbURI = process.env.DEV_DB_URL; 
}

// Función para conectar a MongoDB
async function connectDB() {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Conectado a la base de datos: ${dbURI}`);
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
    }
}

// Función para desconectar de MongoDB
async function disconnectDB() {
    try {
        await mongoose.disconnect();
        console.log('Desconectado de la base de datos.');
    } catch (err) {
        console.error('Error al desconectar de la base de datos:', err);
    }
}

// Ejecutar conexión
connectDB();

module.exports = disconnectDB;
