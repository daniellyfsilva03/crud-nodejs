const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
 
//Importando o arquivo db.js
const db = require('./db');
 
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
 
//CREATE (Cadastro)
app.post('/usuarios', (req, res) => {
    const { nome, email, telefone } = req.body;
    const sql = 'INSERT INTO usuarios (nome, email, telefone) VALUES (?, ?, ?)';
    db.query(sql, [nome, email, telefone], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Usuário cadastrado com sucesso!' });
    });
});
 
//READ (Listagem)
app.get('/usuarios', (req, res) => {
     db.query('SELECT * FROM usuarios', (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
});
 
//UPDATE (Alteração)
app.put('/usuarios/:id', (req, res) => {
    const { nome, email, telefone } = req.body;
    const { id } = req.params;
   
    const sql = 'UPDATE usuarios SET nome=?, email=?, telefone=? WHERE id=?';
    db.query(sql, [nome, email, telefone, id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Usuário atualizado!' });
    });
});


//DELETE (Exclusão)
app.delete('/usuarios/:id', (req, res) =>{
    const { id } = req.params;
    db.query('DELETE FROM usuarios WHERE id=?', [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Usuário removido!' });
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});