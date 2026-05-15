// ========================================
// ROUTES - CAMADA DE ROTAS
// ========================================
// Esta camada é responsável por:
// - Definir as rotas da aplicação
// - Mapear URLs para os controllers correspondentes
// - Seguir o padrão REST para operações CRUD

import express from "express";
import * as PostController from "../controllers/postController.js";

// Cria um roteador do Express
const router = express.Router();

// ========================================
// DEFINIÇÃO DAS ROTAS REST PARA POSTS
// ========================================

/**
 * GET /posts - Lista todos os posts
 * Retorna um array com todos os posts incluindo autor
 */
router.get("/posts", PostController.listar);

/**
 * GET /posts/:id - Obtém um post específico por ID
 * Valida o ID e retorna 404 se não encontrar
 */
router.get("/posts/:id", PostController.buscarPorId);

/**
 * POST /posts - Cria um novo post
 * Body obrigatório: { title, authorId }
 * Body opcional: { content, published }
 * Retorna o post criado com status 201
 */
router.post("/posts", PostController.criar);

/**
 * PUT /posts/:id - Atualiza um post parcialmente
 * Body opcional: { title, content, published }
 * Retorna o post atualizado
 */
router.put("/posts/:id", PostController.atualizar);

/**
 * DELETE /posts/:id - Remove um post
 * Retorna confirmação de deleção
 */
router.delete("/posts/:id", PostController.excluir);

// Exporta o roteador para ser usado no app principal
export default router;
