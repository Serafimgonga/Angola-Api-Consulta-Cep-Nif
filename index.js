

require('dotenv').config();

const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 8080; // Escolha uma porta que você deseja usar para o seu servidor proxy

// Configurar middleware para permitir solicitações CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// 



// Rota para fazer a requisição para o servidor externo e retornar a resposta
app.get('/api/bi/:id', async (req, res) => {
  try {


    const id=req.params.id;


   await axios.get(process.env.URL_BI+"="+id).then((response) => 
    {
        console.log(response.data)
        res.json(response.data);
    
    });
  
    
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer a requisição para o servidor externo.' });
  }
});


app.get('/api/nif/:id', async (req, res) =>{
  try {

    const id =req.params.id;
   await axios.get(process.env.URL_NIF+"="+id).then((response) => 
    {
        console.log(response.data)
        res.json(response.data);
    
    });
   
    
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer a requisição para o servidor externo.' });
  }
});



// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor proxy rodando na porta ${PORT}`);
});
