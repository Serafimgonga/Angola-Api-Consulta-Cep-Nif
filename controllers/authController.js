const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const users = require("../config/users");
const saltRounds = 10; // Número de rounds para gerar o salt

const secretKey = process.env.SECRET_KEY;

// Rota de login para autenticar o usuário e gerar o token JWT
exports.login = async (req, res) => {

  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });
  res.json({ token });
};
