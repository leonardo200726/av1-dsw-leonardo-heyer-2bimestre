// ========================================
// CONTROLLER - CAMADA DE CONTROLE
// ========================================
// Esta camada é responsável por:
// - Receber as requisições HTTP
// - Validar os dados recebidos
// - Chamar os métodos do Model
// - Retornar as respostas adequadas com status HTTP correto

import * as PostModel from "../models/postModel.js";

/**
 * Lista todos os posts
 * @route GET /posts
 */
export async function listar(req, res) {
  try {
    console.log("=== GET /posts ===");
    const posts = await PostModel.listar();
    console.log("Posts retornados:", posts.length);
    res.status(200).json(posts);
  } catch (erro) {
    console.error("Erro ao listar posts (Controller):", erro.message);
    console.error("Detalhes:", erro);
    res.status(500).json({ erro: "Erro ao listar posts", detalhes: erro.message });
  }
}

/**
 * Busca um post específico por ID
 * @route GET /posts/:id
 */
export async function buscarPorId(req, res) {
  try {
    // Valida se o ID é um número
    const id = Number(req.params.id);
    if (Number.isNaN(id) || id <= 0) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const post = await PostModel.buscarPorId(id);

    // Se não encontrar, retorna erro 404
    if (!post) {
      return res.status(404).json({ erro: "Post não encontrado" });
    }

    res.status(200).json(post);
  } catch (erro) {
    console.error("Erro ao buscar post por ID:", erro);
    res.status(500).json({ erro: "Erro ao buscar post" });
  }
}

/**
 * Cria um novo post
 * @route POST /posts
 */
export async function criar(req, res) {
  try {
    const { title, content, published, authorId } = req.body;

    // Validação de campos obrigatórios
    if (!title || !authorId) {
      return res.status(400).json({
        erro: "Campos obrigatórios faltando: title e authorId"
      });
    }

    // Validação de tipos
    if (typeof title !== "string" || title.trim().length === 0) {
      return res.status(400).json({ erro: "Title deve ser uma string não vazia" });
    }

    if (typeof authorId !== "number" || authorId <= 0) {
      return res.status(400).json({ erro: "AuthorId deve ser um número positivo" });
    }

    const novoPost = await PostModel.criar({
      title: title.trim(),
      content: content || null,
      published: published || false,
      authorId
    });

    res.status(201).json(novoPost);
  } catch (erro) {
    console.error("Erro ao criar post:", erro);
    res.status(500).json({ erro: "Erro ao criar post" });
  }
}

/**
 * Atualiza um post (atualização parcial)
 * @route PUT /posts/:id
 */
export async function atualizar(req, res) {
  try {
    // Valida se o ID é um número
    const id = Number(req.params.id);
    if (Number.isNaN(id) || id <= 0) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const { title, content, published } = req.body;

    // Validação: ao menos um campo deve ser fornecido
    if (title === undefined && content === undefined && published === undefined) {
      return res.status(400).json({
        erro: "Ao menos um campo deve ser fornecido para atualização"
      });
    }

    // Validação de tipos (se fornecidos)
    if (title !== undefined && (typeof title !== "string" || title.trim().length === 0)) {
      return res.status(400).json({ erro: "Title deve ser uma string não vazia" });
    }

    if (published !== undefined && typeof published !== "boolean") {
      return res.status(400).json({ erro: "Published deve ser um booleano" });
    }

    const postAtualizado = await PostModel.atualizar(id, {
      title: title ? title.trim() : undefined,
      content,
      published
    });

    // Se não encontrar, retorna erro 404
    if (!postAtualizado) {
      return res.status(404).json({ erro: "Post não encontrado" });
    }

    res.status(200).json(postAtualizado);
  } catch (erro) {
    console.error("Erro ao atualizar post:", erro);
    res.status(500).json({ erro: "Erro ao atualizar post" });
  }
}

/**
 * Deleta um post
 * @route DELETE /posts/:id
 */
export async function excluir(req, res) {
  try {
    // Valida se o ID é um número
    const id = Number(req.params.id);
    if (Number.isNaN(id) || id <= 0) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const postDeletado = await PostModel.excluir(id);

    // Se não encontrar, retorna erro 404
    if (!postDeletado) {
      return res.status(404).json({ erro: "Post não encontrado" });
    }

    res.status(200).json({ mensagem: "Post deletado com sucesso", post: postDeletado });
  } catch (erro) {
    console.error("Erro ao deletar post:", erro);
    res.status(500).json({ erro: "Erro ao deletar post" });
  }
}
