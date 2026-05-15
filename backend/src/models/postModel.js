// ========================================
// MODEL - CAMADA DE DADOS (PRISMA)
// ========================================
// Esta camada é responsável por:
// - Implementar a lógica de acesso a dados usando Prisma
// - Realizar operações CRUD no banco de dados
// - Tratar erros específicos do Prisma (P2025, etc)

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Lista todos os posts
 * @returns {Promise<Array>} - Array de posts
 */
export async function listar() {
  try {
    console.log("Tentando conectar ao Prisma...");
    const posts = await prisma.post.findMany({
      include: {
        author: true
      }
    });
    console.log("Posts encontrados:", posts.length);
    return posts;
  } catch (erro) {
    console.error("Erro ao listar posts - Detalhes:", erro.message);
    console.error("Código erro:", erro.code);
    console.error("Stack:", erro.stack);
    throw erro;
  }
}

/**
 * Busca um post por ID
 * @param {number} id - ID do post
 * @returns {Promise<Object|null>} - Post encontrado ou null se não existir
 */
export async function buscarPorId(id) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: {
        author: true
      }
    });
    return post;
  } catch (erro) {
    // Prisma retorna erro P2025 quando o registro não é encontrado
    if (erro.code === "P2025") {
      return null;
    }
    console.error("Erro ao buscar post por ID:", erro);
    throw erro;
  }
}

/**
 * Cria um novo post
 * @param {Object} dados - Dados do post { title, content, published, authorId }
 * @returns {Promise<Object>} - Post criado
 */
export async function criar(dados) {
  try {
    // Validação básica
    if (!dados.title || !dados.authorId) {
      throw new Error("Title e authorId são obrigatórios");
    }

    const post = await prisma.post.create({
      data: {
        title: dados.title,
        content: dados.content || null,
        published: dados.published || false,
        authorId: parseInt(dados.authorId)
      },
      include: {
        author: true
      }
    });
    return post;
  } catch (erro) {
    console.error("Erro ao criar post:", erro);
    throw erro;
  }
}

/**
 * Atualiza um post (atualização parcial)
 * @param {number} id - ID do post
 * @param {Object} dados - Dados a atualizar (todos os campos são opcionais)
 * @returns {Promise<Object|null>} - Post atualizado ou null se não existir
 */
export async function atualizar(id, dados) {
  try {
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        ...(dados.title !== undefined && { title: dados.title }),
        ...(dados.content !== undefined && { content: dados.content }),
        ...(dados.published !== undefined && { published: dados.published })
      },
      include: {
        author: true
      }
    });
    return post;
  } catch (erro) {
    // Prisma retorna erro P2025 quando o registro não é encontrado
    if (erro.code === "P2025") {
      return null;
    }
    console.error("Erro ao atualizar post:", erro);
    throw erro;
  }
}

/**
 * Deleta um post
 * @param {number} id - ID do post a deletar
 * @returns {Promise<Object|null>} - Post deletado ou null se não existir
 */
export async function excluir(id) {
  try {
    const post = await prisma.post.delete({
      where: { id: parseInt(id) }
    });
    return post;
  } catch (erro) {
    // Prisma retorna erro P2025 quando o registro não é encontrado
    if (erro.code === "P2025") {
      return null;
    }
    console.error("Erro ao excluir post:", erro);
    throw erro;
  }
}
