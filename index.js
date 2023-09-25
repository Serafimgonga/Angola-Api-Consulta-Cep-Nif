require("dotenv").config();

const express = require("express");
const axios = require("axios");
const app = express();
//const PORT = 8080; // Escolha uma porta que você deseja usar para o seu servidor proxy


const porta = process.env.PORT || 8080; // 8080 é um valor padrão caso a variável de ambiente não seja definida
const host ="0.0.0.0" // 8080 é um valor padrão caso a variável de ambiente não seja definida



// Configurar middleware para permitir solicitações CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//

app.get("/api2/bi/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const request1 = axios.get(process.env.URL_BI2 + id);
    const request2 = axios.get(process.env.URL_BI1 + "=" + id);

    // Use Promise.all para fazer as duas requisições simultaneamente
    const [response1, response2] = await Promise.all([request1, request2]);

    const objetoCombinado = Object.assign(
      {},
      response2.data,
      response1.data.data
    );

    // console.log('Dados objetoCombinado:',objetoCombinado);

    res.status(200).json(objetoCombinado);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao fazer a requisição para o servidor externo." });
  }
});

// Rota para fazer a requisição para o servidor externo e retornar a resposta
app.get("/api/bi/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await axios.get(process.env.URL_BI + "=" + id).then((response) => {
      res.json(response.data);
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao fazer a requisição para o servidor externo." });
  }
});

app.get("/api/nif/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await axios.get(process.env.URL_NIF + "=" + id).then((response) => {
      console.log(response.data);
      res.json(response.data);
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao fazer a requisição para o servidor externo." });
  }
});

// Iniciar o servidor
app.listen(porta, () => {
  console.log(`API está rodando na porta ${porta}`);
});
