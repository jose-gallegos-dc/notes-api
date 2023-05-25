require('dotenv').config();
const express = require('express');
const authRouter = require('./routes/authRoutes');
const noteRouter = require('./routes/noteRoutes');
const cors = require('cors');
const mongoose = require('mongoose');
const URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
   return res.status(200).json({ message: 'Welcome to API notes.' });
});

app.use('/api', authRouter, noteRouter);

// MANEJO DE RUTA NO ENCONTRADA(404)
app.use((req, res, next) => {
   const error = new Error('Route not found.');
   error.status = 404;
   next(error);
});

// MANEJO DE ERRORES
app.use((error, req, res, next) => {
   const message = error.message || 'Internal server error';
   const status = error.status || 500;
   return res.status(status).json({ message: message });
});

mongoose.connect(URL)
   .then(() => {
      console.log('Connected to database.');

      app.listen(PORT, () => {
         console.log('Server started on port no. ' + PORT);
      });
   })
   .catch((error) => {
      console.log('Failed to connect to database:', error);
   });
