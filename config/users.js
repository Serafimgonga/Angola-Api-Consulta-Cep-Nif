
require("dotenv").config();

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

  module.exports = users;