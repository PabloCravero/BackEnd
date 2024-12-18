require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const allowedOrigins = [
  'https://front-end-swart-five-19.vercel.app', 
  'http://localhost:4200', 
];


app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por CORS'));
    }
  },
  credentials: true, 
}));

app.use(express.json());
app.use(bodyParser.json());

require('./initAdminUser.js');
require('./database.js');

app.use('/api', require('./routes/user.js'));
app.use('/api', require('./routes/product.js'));
app.use('/api', require('./routes/order.js'));
app.use('/api', require('./routes/supplier.js'));
app.use('/api', require('./routes/discount.js'));
app.use('/api', require('./routes/upload-image-profile.js'));
app.use(require('./routes/enviar-correo.js'));


app.use('/uploadsProfileImages', express.static(path.join(__dirname, 'uploadsProfileImages')));
app.use('/uploadsProductsImages', express.static('uploadsProductsImages'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal en el servidor');
});

const PORT = process.env.PORT || 0;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };
