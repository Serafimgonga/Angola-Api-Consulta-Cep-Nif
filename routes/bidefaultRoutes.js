require("dotenv").config();
const express = require("express");
const axios = require("axios");
const { verifyToken } = require("../middlewares/authMiddleware");
const { authorizeRole } = require("../middlewares/authorizationMiddleware");

const router = express.Router();

router.get("/:id",verifyToken, authorizeRole(["admin"]), async (req, res) => {
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

  module.exports = router;
