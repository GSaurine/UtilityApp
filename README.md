# TrabalhoPA - To-Do List com Electron, Node.js e MariaDB

Este projeto é uma aplicação de lista de tarefas (To-Do List) desenvolvida com Electron no frontend e uma API Node.js/Express no backend, utilizando MariaDB para persistência de dados.

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js instalado.
- MariaDB ou MySQL rodando localmente.

### 1. Configuração do Backend
1. Navegue até a pasta `backend`:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`.
   - Edite o `.env` com suas credenciais do banco de dados e uma chave secreta para o JWT.
4. Execute as migrações para criar o banco e as tabelas:
   ```bash
   npm run migrate
   ```
5. Inicie o servidor:
   ```bash
   npm start
   ```

### 2. Configuração do Frontend (Electron)
1. Na raiz do projeto, instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o Electron:
   ```bash
   npm start
   ```

## 🛠️ Funcionalidades Implementadas
- **Autenticação:** Cadastro e login de usuários com JWT e bcrypt.
- **Persistência:** Tarefas salvas no banco de dados MariaDB vinculadas ao usuário.
- **CRUD Completo:** Listagem, criação, atualização (concluir) e exclusão de tarefas.
- **Interface Responsiva:** Desenvolvida com Vanilla CSS.

## 📋 Próximos Passos (Roadmap)
Veja o arquivo `GEMINI.md` para acompanhar a evolução do projeto e as próximas metas.
