# CRUD de Posts - Exemplos de Requisições para Insomnia/Postman

## Base URL
```
http://localhost:3000
```

---

## 1️⃣ LISTAR TODOS OS POSTS
```
GET /posts
```

**Resposta esperada (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Primeiro Post",
    "content": "Conteúdo do primeiro post",
    "published": true,
    "authorId": 1,
    "author": {
      "id": 1,
      "email": "usuario@example.com",
      "name": "João"
    }
  }
]
```

---

## 2️⃣ BUSCAR UM POST POR ID
```
GET /posts/:id
```

**Exemplo:**
```
GET /posts/1
```

**Resposta esperada (200 OK):**
```json
{
  "id": 1,
  "title": "Primeiro Post",
  "content": "Conteúdo do primeiro post",
  "published": true,
  "authorId": 1,
  "author": {
    "id": 1,
    "email": "usuario@example.com",
    "name": "João"
  }
}
```

**Se ID não existir (404 Not Found):**
```json
{
  "erro": "Post não encontrado"
}
```

**Se ID inválido (400 Bad Request):**
```json
{
  "erro": "ID inválido"
}
```

---

## 3️⃣ CRIAR UM NOVO POST
```
POST /posts
Content-Type: application/json
```

**Body obrigatório:**
```json
{
  "title": "Meu Novo Post",
  "authorId": 1
}
```

**Body completo (com campos opcionais):**
```json
{
  "title": "Meu Novo Post",
  "content": "Este é o conteúdo do meu novo post",
  "published": false,
  "authorId": 1
}
```

**Resposta esperada (201 Created):**
```json
{
  "id": 5,
  "title": "Meu Novo Post",
  "content": "Este é o conteúdo do meu novo post",
  "published": false,
  "authorId": 1,
  "author": {
    "id": 1,
    "email": "usuario@example.com",
    "name": "João"
  }
}
```

**Se campos obrigatórios faltarem (400 Bad Request):**
```json
{
  "erro": "Campos obrigatórios faltando: title e authorId"
}
```

---

## 4️⃣ ATUALIZAR UM POST
```
PUT /posts/:id
Content-Type: application/json
```

**Exemplo:**
```
PUT /posts/1
```

**Body (todos os campos são opcionais):**
```json
{
  "title": "Título Atualizado",
  "content": "Conteúdo atualizado",
  "published": true
}
```

**Ou apenas alguns campos:**
```json
{
  "title": "Novo Título",
  "published": true
}
```

**Resposta esperada (200 OK):**
```json
{
  "id": 1,
  "title": "Título Atualizado",
  "content": "Conteúdo atualizado",
  "published": true,
  "authorId": 1,
  "author": {
    "id": 1,
    "email": "usuario@example.com",
    "name": "João"
  }
}
```

**Se post não existir (404 Not Found):**
```json
{
  "erro": "Post não encontrado"
}
```

**Se nenhum campo for fornecido (400 Bad Request):**
```json
{
  "erro": "Ao menos um campo deve ser fornecido para atualização"
}
```

---

## 5️⃣ DELETAR UM POST
```
DELETE /posts/:id
```

**Exemplo:**
```
DELETE /posts/1
```

**Resposta esperada (200 OK):**
```json
{
  "mensagem": "Post deletado com sucesso",
  "post": {
    "id": 1,
    "title": "Primeiro Post",
    "content": "Conteúdo do primeiro post",
    "published": true,
    "authorId": 1
  }
}
```

**Se post não existir (404 Not Found):**
```json
{
  "erro": "Post não encontrado"
}
```

---

## 📋 Checklist de Requisições para Testar

- [ ] **GET /posts** - Listar todos
- [ ] **GET /posts/1** - Buscar por ID válido
- [ ] **GET /posts/999** - Buscar por ID inexistente
- [ ] **GET /posts/abc** - Buscar com ID inválido
- [ ] **POST /posts** com dados completos
- [ ] **POST /posts** com apenas campos obrigatórios
- [ ] **POST /posts** sem title (deve falhar)
- [ ] **POST /posts** sem authorId (deve falhar)
- [ ] **PUT /posts/1** atualizando title apenas
- [ ] **PUT /posts/1** atualizando múltiplos campos
- [ ] **PUT /posts/999** ID inexistente (deve retornar 404)
- [ ] **PUT /posts/1** sem nenhum campo (deve retornar 400)
- [ ] **DELETE /posts/1** deletar existente
- [ ] **DELETE /posts/999** deletar inexistente (deve retornar 404)

---

## 🔍 Códigos de Status HTTP Esperados

| Operação | Status | Significado |
|----------|--------|------------|
| Listar | 200 | OK |
| Buscar por ID (existe) | 200 | OK |
| Buscar por ID (não existe) | 404 | Not Found |
| Buscar ID inválido | 400 | Bad Request |
| Criar com sucesso | 201 | Created |
| Criar sem campos obrigatórios | 400 | Bad Request |
| Atualizar com sucesso | 200 | OK |
| Atualizar inexistente | 404 | Not Found |
| Atualizar sem campos | 400 | Bad Request |
| Deletar com sucesso | 200 | OK |
| Deletar inexistente | 404 | Not Found |
| Erro do servidor | 500 | Internal Server Error |

---

## 💡 Observações Importantes

1. **Prisma Client**: Todas as operações usam Prisma 5.22.0
2. **Tratamento de P2025**: Erro "registro não encontrado" retorna `null` do model e `404` do controller
3. **Validações**:
   - Title é obrigatório e não pode ser vazio
   - AuthorId é obrigatório e deve ser um número positivo
   - Published é opcional (padrão: false)
   - Content é opcional
4. **Include de Author**: Todas as respostas incluem os dados do author
5. **Trim automático**: Valores de title são automaticamente trimados (espaços removidos)

---

## 🧪 Sequência de Teste Recomendada

1. Criar um usuário (ou usar um existente do banco)
2. Listar posts - deve retornar array vazio ou com dados existentes
3. Criar um novo post com o ID do usuário
4. Buscar o post criado
5. Atualizar o post
6. Listar novamente para confirmar atualização
7. Deletar o post
8. Tentar buscar o post deletado (deve retornar 404)
