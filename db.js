const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // sem senha
    database: 'cadastro_node'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar noMySQL:', err);
        return;
    }
console.log('Conectado ao MySQL!');
});

module.exports = connection;