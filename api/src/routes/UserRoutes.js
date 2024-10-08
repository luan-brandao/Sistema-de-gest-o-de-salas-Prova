const { Router } = require("express");
const router = Router();
const UserController = require("../controllers/UserController");
const authMiddleware = require("../middlewares/authMiddleware"); // Importa o middleware

// Rota para listar todos os usuários (pode ser pública ou protegida)
router.get("/users", UserController.index);

// Rota para criar um novo usuário
router.post("/create", UserController.store); // POST para criação

// Rota para exibir um único usuário por ID
router.get("/show/:id", UserController.show);

// Rota para atualizar um usuário por ID (protegida)
router.put("/update/:id", authMiddleware, UserController.update);

// Rota para deletar um usuário por ID (protegida)
router.delete("/delete/:id", authMiddleware, UserController.delete);

// Rota para login de usuário
router.post("/login", UserController.login); // Rota para login

router.get("/me", authMiddleware, UserController.getMe);

module.exports = router;
