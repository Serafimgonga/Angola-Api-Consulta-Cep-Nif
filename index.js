
const express = require("express");
const bodyParser = require("body-parser");
const authController = require("./controllers/authController");
const biRoutes = require("./routes/biRoutes");
const nifRoutes = require("./routes/nifRoutes");
const bidefaultRoutes = require("./routes/bidefaultRoutes");
const cors =require("cors");
const app = express();
app.use(bodyParser.json());

//const PORT = 8080; // Escolha uma porta que você deseja usar para o seu servidor proxy

const porta = process.env.PORT || 8080; // 8080 é um valor padrão caso a variável de ambiente não seja definida
const host = "0.0.0.0"; // 8080 é um valor padrão caso a variável de ambiente não seja definida

// Configurar middleware para permitir solicitações CORS

// Permite todas as origens, cabeçalhos e métodos
//app.use(cors());
app.use(cors({
  //origin: 'http://meusite.com', // Especifique a origem permitida
  origin: '*',
  methods: ['GET', 'POST'], // Especifique os métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Especifique os cabeçalhos permitidos
}));

/*
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});*/

// Rotas para autenticação
app.post("/login", authController.login);

// Rotas para outros recursos
app.use("/", bidefaultRoutes);
app.use("/bi", biRoutes);
app.use("/nif", nifRoutes);


// Iniciar o servidor
app.listen(porta, () => {
  console.log(`API está rodando na porta ${porta}`);
});