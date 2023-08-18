const express = require('express');
const routes = require('./routes/index')
const sequelize = require('./config/db') 

const app = express();
const PORT = process.env.PORT || 3000;




sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada');

    app.use(routes)

    app.listen(PORT, () => {
      console.log(`Servidor iniciado en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });





