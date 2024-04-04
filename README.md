# DikambaApi - API de Consulta de Dados de Utente (BI/NIF)

A DikambaApi é uma API RESTful que permite aos usuários recuperar informações de utentes (cidadãos) angolanos com base no bilhete de identificação (BI) ou no número de identificação fiscal (NIF). A API faz uso de endpoints que consomem serviços disponibilizados por portais do governo angolano, como SEPE, Ministério das Finanças, AGT, entre outros.

## Pré-requisitos

- Node.js instalado
- ...

## Instalação

1. Clone o repositório: `git clone git@github.com:Serafimgonga/Angola-Api-Consulta-Cep-Nif.git`
2. Entre no diretório do projeto: `cd seu-projeto`
3. Instale as dependências: `npm install`

## Recursos

- [Requisitos de Autenticação](#requisitos-de-autenticação)
- [Endpoints](#endpoints)
- [Exemplo de Uso](#exemplo-de-uso)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Requisitos de Autenticação

Para acessar a API, é necessário realizar a autenticação fornecendo um token de acesso JWT válido. As requisições à API devem incluir este token no cabeçalho de autorização.

## Endpoints

### Rota: `/login`

Esta rota permite autenticar um usuário e gerar um token JWT válido para acessar os endpoints protegidos da API.

- **Método HTTP:** POST
- **Requisitos de autenticação:** Não é necessário
- **Corpo da Requisição:**
  - `username` (obrigatório): O nome de usuário do usuário.
  - `password` (obrigatório): A senha do usuário.
- **Resposta:**
  - Status 200 OK: Retorna um token JWT válido.
  - Status 401 Unauthorized: Credenciais inválidas.
  
 Exemplo de Uso:

As informações estão sendo armazenadas estaticamente, em breve poderei implementar um banco de dados . para destacar que neste momento temos dois usuários, o Adm e o convidado, o admin só o criador tem o domínio, o convidado é para qualquer um.

- ```http
- GET /login/ HTTP/1.1
- Host: https://angola-api-oi.onrender.com/
- Authorization: Seu-Token-JWT
{
  "username": "seu-username",
  "password": "sua-senha"
}

Você pode usar esta credencial para um usuário com função de convidado, este usuário só poderá acessar esta rota `/nif/:id`
, caso queira acessar outras rotas, entre em contato com o criador,
{
  "username": "convidado",
  "password": "convidado"
}

### Rota: `/:id`

Esta rota permite recuperar informações do bilhete de identificação (BI) de um utente angolano com base no ID fornecido.

- **Método HTTP:** GET
- **Requisitos de autenticação:** Token JWT válido com papel de "admin"
- **Parâmetros:**
  - `id` (obrigatório): O ID do utente cujas informações do BI serão recuperadas.
- **Resposta:**
  - Status 200 OK: Retorna os dados do BI do utente em formato JSON.
  - Status 401 Unauthorized: Falha na autenticação do token JWT.
  - Status 403 Forbidden: Acesso proibido para o usuário com o papel fornecido.
  - Status 500 Internal Server Error: Erro ao fazer a requisição para o servidor externo.

 Exemplo de Uso:
- ```http
- GET /00123 HTTP/1.1
- Host: https://angola-api-oi.onrender.com/
- Authorization: Seu-Token-JWT

### Rota: `/bi/:id`

Esta rota permite buscar informações mais detalhadas do Bilhete de Identidade (BI) de um utente angolano com base no ID fornecido.

- **Método HTTP:** GET
- **Requisitos de autenticação:** Token JWT válido com papel de "admin"
- **Parâmetros:**
  - `id` (obrigatório): O ID do utente cujas informações do BI serão recuperadas.
- **Resposta:**
  - Status 200 OK: Retorna os dados do BI do utente em formato JSON.
  - Status 401 Unauthorized: Falha na autenticação do token JWT.
  - Status 403 Forbidden: Acesso proibido para o usuário com o papel fornecido.
  - Status 500 Internal Server Error: Erro ao fazer a requisição para o servidor externo.

Exemplo de Uso:

- ```http
- GET /bi/00123 HTTP/1.1
- Host: https://angola-api-oi.onrender.com/
- Authorization: Seu-Token-JWT
  
### Rota: `/nif/:id`

Esta rota permite recuperar informações do número de identificação fiscal (NIF) de um utente angolano com base no ID fornecido.

- **Método HTTP:** GET
- **Requisitos de autenticação:** Token JWT válido com papel de "admin" ou "convidado"
- **Parâmetros:**
  - `id` (obrigatório): O ID do utente cujas informações do NIF serão recuperadas.
- **Resposta:**
  - Status 200 OK: Retorna os dados do NIF do utente em formato JSON.
  - Status 401 Unauthorized: Falha na autenticação do token JWT.
  - Status 403 Forbidden: Acesso proibido para o usuário com o papel fornecido.
  - Status 500 Internal Server Error: Erro ao fazer a requisição para o servidor externo.
  
  Exemplo de Uso:

- ```http
- GET /nif/00123 HTTP/1.1
- Host: https://angola-api-oi.onrender.com/
- Authorization: Seu-Token-JWT


## Contribuição

Aqui estão algumas maneiras pelas quais você pode contribuir:

### Como Contribuir

Aceito contribuições em várias formas, incluindo:

- Correções de bugs
- Implementação de novos recursos
- Melhorias na documentação
- Testes adicionais
- Otimizações de desempenho

Se você não tem certeza de por onde começar, verifique a seção de tarefas pendentes abaixo ou entre em contato comigo para obter mais informações.

### Diretrizes de Contribuição

Para contribuir com este projeto, siga estas etapas:

1. Faça um fork do repositório e clone-o para o seu ambiente local.
2. Configure seu ambiente de desenvolvimento.
3. Faça suas alterações e teste-as localmente.
4. Envie um pull request com suas alterações.

Por favor, certifique-se de seguir com as diretrizes de código e estilo. Antes de enviar um pull request, verifique se sua contribuição não quebra os testes existentes e adicione novos testes, se necessário.

### Tarefas Pendentes

- Encontrar métodos eficazes para manter a segurança dos dados
- Implementar banco de dados usando MongoDB
- Melhorar a documentação sobre como configurar o projeto

Se você gostaria de trabalhar em uma dessas tarefas ou tem outras ideias de como contribuir, sinta-se à vontade para entrar em contato conosco ou enviar um pull request.


### Entre em Contato

Se você tiver dúvidas ou precisar de ajuda, não hesite em entrar em contato pelo email [serafimag2020@gmail.com] ou abrindo uma issue no GitHub.

Espero ansiosamente suas contribuições!

## Licença

Este projeto está licenciado por.
