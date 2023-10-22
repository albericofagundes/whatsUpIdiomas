const express = require("express");
const pool = require("./config/db");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Rota de login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = $1 AND password = $2";
  const values = [username, password];

  try {
    const result = await pool.query(query, values);

    if (result.rows.length === 1) {
      res.status(200).json({ message: "Login bem-sucedido" });
    } else {
      res.status(401).json({ message: "Credenciais inválidas" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

// Rota para criar um novo usuário
app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
  
    const query = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
    const values = [username, email, password];
  
    try {
      await pool.query(query, values);
  
      res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro no servidor" });
    }
  });

  // Rota para listar todos os usuários
app.get("/users", async (req, res) => {
    try {
      const query = "SELECT * FROM users";
      const result = await pool.query(query);
  
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro no servidor" });
    }
  });
  
  



app.get("/", (req, res) => {
  res.send(`Servidor Node.js está ouvindo na porta ${port}`);
});

app.listen(port, () => {
  console.log(`Servidor Node.js está ouvindo na porta ${port}`);
});
