require("dotenv").config();
const express = require("express");
const axios = require("axios");
const { verifyToken } = require("../middlewares/authMiddleware");
const { authorizeRole } = require("../middlewares/authorizationMiddleware");
const obj = require("../config/data");

const router = express.Router();

router.get("/:id", verifyToken, authorizeRole(["admin"]), async (req, res) => {
  try {
    const id = req.params.id;
    
    const request1 = await axios.get(process.env.URL_BI2 + id);
    const request2 = await axios.get(process.env.URL_BI1 + "=" + id);

    // Usei Promise.all para fazer as duas requisições simultaneamente
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

module.exports = router;
