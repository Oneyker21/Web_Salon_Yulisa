//Configuracion de la conexion a la base de datos
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json({ limit: '50mb' }));

// Configuración de la conexión a la base de datos

/* Daniela */
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mysql2023',
    database: 'salon_yulisa'
});

/* Oneyker */
/* const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ONEYKER2105',
    database: 'salon_yulisa'
}); */

/* la constraseña de Eliab: gitdev2051 */

db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
    } else {
        console.error('Conexión exitosa a la base de datos');
    }
});

app.use(cors());

const crudRoutes = require('./routes/CrudRoutes.js')(db); //Pasa la instancia de la base de datos a crudRoutes
app.use('/crud', crudRoutes);

// Manejador de errores
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && 'body' in err) {
      res.status(400).send({ error: 'Error en el análisis de JSON' });
    } else {
      next();
    }
  });

app.listen(port, () => {
    console.log(`Servidor backend en funcionamiento en el puerto ${port}`);
});