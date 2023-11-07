require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();


const porta = process.env.PORT || 8080; // 8080 é um valor padrão caso a variável de ambiente não seja definida
const host = "0.0.0.0"; // 0.0.0.0 é um valor padrão caso a variável de ambiente não seja definida

// Configurar middleware para permitir solicitações CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//
const obj = {
  sucess: null,
  code: null,
  message: "",
  data: {
    ID_NUMBER: "",
    EXPIRATION_DATE: "",
    CONTACT_MOBILE: "",
    PERSON_ID: "",
    APPLICATION_ID: "",
    ADDRESS: "",
    PHOTO: "",
    LAST_NAME: "",
    FIRST_NAME: "",
    numero: "",
    nome: "",
    nif: "",
    data_nasc: "",
    genero: "",
    naturalidade: "",
    pai_nome_completo: "",
    mae_nome_completo: "",
    estado_civil: "",
    data_emissao: "",
    emissao_local: "",
  },
};

// Rota para fazer a requisição para o servidor externo e retornar a resposta

app.get("/angola/api/bi/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const request1 = await axios.get(process.env.URL_BI2 + id);
    const request2 = await axios.get(process.env.URL_BI1 + "=" + id);

    // aqui usei Promise.all para fazer as duas requisições simultaneamente
    const [response1, response2] = await Promise.all([request1, request2]);

    obj.code = response1.data.code;

    obj.data.ID_NUMBER = response1.data.data.ID_NUMBER;
    obj.data.EXPIRATION_DATE = response1.data.data.EXPIRATION_DATE;
    obj.data.CONTACT_MOBILE = response1.data.data.CONTACT_MOBILE;
    obj.data.PERSON_ID = response1.data.data.PERSON_ID;
    obj.data.APPLICATION_ID = response1.data.data.APPLICATION_ID;
    obj.data.ADDRESS = response1.data.data.ADDRESS;
    obj.data.PHOTO = response1.data.data.PHOTO;
    obj.data.LAST_NAME = response1.data.data.LAST_NAME;
    obj.data.FIRST_NAME = response1.data.data.FIRST_NAME;

    obj.sucess = response2.data.sucess;
    obj.message = response2.data.message;

    obj.data.numero = response2.data.data.numero;
    obj.data.nome = response2.data.data.nome;
    obj.data.nif = response2.data.data.nif;
    obj.data.data_nasc = response2.data.data.data_nasc;
    obj.data.genero = response2.data.data.genero;
    obj.data.naturalidade = response2.data.data.naturalidade;
    obj.data.pai_nome_completo = response2.data.data.pai_nome_completo;
    obj.data.mae_nome_completo = response2.data.data.mae_nome_completo;
    obj.data.estado_civil = response2.data.data.estado_civil;
    obj.data.data_emissao = response2.data.data.data_emissao;
    obj.data.emissao_local = response2.data.data.emissao_local;

    res.status(200).json(obj);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao fazer a requisição para o servidor externo." });
  }
});

app.get("/angola/api/nif/:id", async (req, res) => {
  const id = req.params.id;

  await axios
    .get(process.env.URL_NIF + "=" + id)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error:"Erro ao fazer a requisição para o servidor externo." });
    });
});

// Iniciar o servidor
app.listen(porta, () => {
  console.log(`API está rodando na porta ${porta}`);
});
