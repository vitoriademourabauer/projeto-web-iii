const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/mensagem', (req, res) => {
    res.json({texto: "Olá do Servidor!"});
})

app.get('/cep/:cep', async (req, res) => {

    const { cep } = req.params;

    try {
        const respostas = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await respostas.json();

        if(dados.erro) {
            return res.status(404).json({erro: "CEP não encontrado"});
        }

        res.status(200).json(dados);
    } 
    catch (err) {
        res.status(500).json({erro: "Erro de comunicação com VIACEP"})
    }
});


app.get('/cep/:estado/:cidade/:logradouro', async (req, res) => {

    const { estado, cidade, logradouro } = req.params;

    try {
        const respostas = await fetch(`https://viacep.com.br/ws/${estado}/${cidade}/${logradouro}/json/`);
        const dados = await respostas.json();

        if(Array.isArray(dados) && dados.length === 0) {
            return res.status(404).json({erro: "CEP não encontrado"});
        }

        res.status(200).json(dados);
    } 
    catch (err) {
        res.status(500).json({erro: "Erro de comunicação com VIACEP"})
    }
});


app.get('/cep/xml/:cep', async (req, res) => {

    const { cep } = req.params;

    try {
        const respostas = await fetch(`https://viacep.com.br/ws/${cep}/xml/`);
        const xmlDados = await respostas.text();

        if(xmlDados.includes('<erro>true</erro>')) {
            return res.status(404).json({erro: "CEP não encontrado"});
        }

        res.type('application/xml').send(xmlDados);
    } 
    catch (err) {
        res.status(500).send('<erro>Erro na conversão XML</erro>');
    }
});


app.listen(3001); 