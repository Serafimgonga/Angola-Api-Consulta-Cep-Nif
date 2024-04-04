const jwt = require("jsonwebtoken");
const users = require("../config/users");

const secretKey = process.env.SECRET_KEY;

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Falha na autenticação do token" });
    }

    req.user = users.find(user => user.id === decoded.userId);
    next();
  });
};
