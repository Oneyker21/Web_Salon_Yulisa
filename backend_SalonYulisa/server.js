
//Configuracion de la conexion a la base de datos
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 5000;
// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mysql2023',
    database: 'world'
});
db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

app.use(cors());

// Iniciar el servidor 
app.listen(port, () => {
    console.log(`Servidor backend en funcionamiento en el puerto ${port}`);
});

const CrudRoutes = require('./routes/CrudRoutes')(db);
app.use('/crud', CrudRoutes);
