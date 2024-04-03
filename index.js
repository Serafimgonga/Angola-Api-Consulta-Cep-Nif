require("dotenv").config();

const express = require("express");
const axios = require("axios");

const bodyParser = require("body-parser");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
app.use(bodyParser.json());

const secretKey = process.env.SECRET_KEY; // Chave secreta para assinar o token JWT

//const PORT = 8080; // Escolha uma porta que você deseja usar para o seu servidor proxy

const porta = process.env.PORT || 8080; // 8080 é um valor padrão caso a variável de ambiente não seja definida
const host = "0.0.0.0"; // 8080 é um valor padrão caso a variável de ambiente não seja definida

// Configurar middleware para permitir solicitações CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Configuração de usuário (apenas para demonstração, substitua por um banco de dados real)
const users = [
  {
    id: 1,
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    role: "admin",
  },
  {
    id: 2,
    username: "convidado",
    password: "$2b$10$D0.4NCBDqHImTE7E/oziueGQV93VtHP6ayFUFx9WAUjtq56UEgcMO",//convidado
    role: "convidado",
  },
];



// Rota de login para autenticar o usuário e gerar o token JWT
app.post("/login", async (req, res) => {

  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }
  // Gerar token JWT
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });
  res.json({ token });
});
// Middleware para controle de acesso baseado em função
function authorizeRole(roles) {
  return (req, res, next) => {

      if (!roles.includes(req.user.role)) {
          return res.status(403).json({ message: 'Acesso proibido para o seu papel' });
      }

      next();
  };
}


// Função para verificar e extrair token JWT da requisição
function verifyToken(req, res, next) {

  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Falha na autenticação do token" });
    }

    req.user = users.find(user => user.id === decoded.userId);
    //req.userId = decoded.userId;
    next();
  });
}





//
const obj = {
  sucess: null,
  code: null,
  message: "",
  data: {
    id_number: "",
    nif: "",
    person_id: "",
    application_id: "",
    numero: "",
    nome: "",
    first_name: "",
    last_name: "",
    genero: "",
    data_nasc: "",
    estado_civil: "",
    naturalidade: "",
    address: "",
    contact_mobile: "",
    pai_nome_completo: "",
    mae_nome_completo: "",
    emissao_local: "",
    data_emissao: "",
    expiration_date: "",
    photo: "",
  },
};

/*Rota Complexas*/

app.get("/bi/:id", verifyToken, authorizeRole(["admin"]), async (req, res) => {
  try {
    const id = req.params.id;

    const request1 = await axios.get(process.env.URL_BI2 + id);
    const request2 = await axios.get(process.env.URL_BI1 + "=" + id);

    // Use Promise.all para fazer as duas requisições simultaneamente
    const [response1, response2] = await Promise.all([request1, request2]);

    obj.code = response1.data.code;

    obj.data.id_number = response1.data.data.ID_NUMBER;
    obj.data.expiration_date = response1.data.data.EXPIRATION_DATE;
    obj.data.contact_mobile = response1.data.data.CONTACT_MOBILE;
    obj.data.person_id = response1.data.data.PERSON_ID;
    obj.data.application_id = response1.data.data.APPLICATION_ID;
    obj.data.address = response1.data.data.ADDRESS;
    obj.data.photo = response1.data.data.PHOTO;
    obj.data.last_name = response1.data.data.LAST_NAME;
    obj.data.first_name = response1.data.data.FIRST_NAME;

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

/*Rota para */

app.get("/nif/:id", verifyToken, authorizeRole(["admin", "convidado"]), async (req, res) => {
  const id = req.params.id;

  await axios
    .get(process.env.URL_NIF + "=" + id)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Erro ao fazer a requisição para o servidor externo." });
    });
});

/* Rota simples */
app.get("/:id",verifyToken, authorizeRole(["admin"]), async (req, res) => {
  const id = req.params.id;

  await axios
    .get(process.env.URL_BI1 + "=" + id)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Erro ao fazer a requisição para o servidor externo." });
    });
});

// Iniciar o servidor
app.listen(porta, () => {
  console.log(`API está rodando na porta ${porta}`);
});
