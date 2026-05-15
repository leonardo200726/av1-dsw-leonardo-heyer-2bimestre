import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    console.log("Criando usuário de teste...");
    
    const user = await prisma.user.create({
      data: {
        email: "leonardo@example.com",
        name: "Leonardo Heyer"
      }
    });
    
    console.log("✅ Usuário criado:", user);
    
    console.log("\nCriando post de teste...");
    
    const post = await prisma.post.create({
      data: {
        title: "Primeiro Post de Teste",
        content: "Este é o primeiro post da API",
        published: true,
        authorId: user.id
      },
      include: {
        author: true
      }
    });
    
    console.log("✅ Post criado:", post);
    
  } catch (erro) {
    console.error("❌ Erro:", erro.message);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
