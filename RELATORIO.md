# Relatório do Projeto: TrabalhoPA - Aplicativo Multi-Utilitário

## 1. Introdução
O **TrabalhoPA** é uma aplicação desktop desenvolvida para centralizar diversas ferramentas de produtividade em um único lugar. Construído utilizando a arquitetura cliente-servidor, o projeto combina a versatilidade do **Electron** para a interface desktop com o poder do **Node.js** e **Express** para o processamento de dados e persistência em banco de dados.

O objetivo principal é oferecer utilitários como cronômetro Pomodoro, gerador de senhas, formatador de JSON, relógio mundial e uma lista de tarefas (To-Do) integrada.

---

## 2. Explicação Simples do Código

A estrutura do projeto é dividida em duas partes principais:

### 📂 Frontend (Electron)
Localizado na raiz e na pasta `src/`, é o que o usuário vê e interage.
- **`main.js`**: O "cérebro" do app no sistema operacional. Ele cria a janela principal e gerencia o ciclo de vida do aplicativo.
- **`src/index.html` e `style.css`**: Definem o visual e a estrutura básica da interface.
- **`src/modules/`**: Contém a lógica individual de cada ferramenta (ex: `pomodoro.js`, `passgen.js`). Cada módulo é carregado conforme a necessidade, mantendo o código organizado.
- **`src/services/api.js`**: Faz a ponte de comunicação entre a interface visual e o servidor backend.

### 📂 Backend (Node.js & API)
Localizado na pasta `backend/`, é responsável por processar as informações de forma segura.
- **`src/index.js`**: Ponto de entrada do servidor que escuta as requisições.
- **`src/auth.js`**: Gerencia o sistema de usuários (cadastro e login) usando criptografia para as senhas.
- **`src/db.js`**: Configura a conexão com o banco de dados MySQL.
- **`migrations/01_dbcreation.js`**: Script automatizado para criar as tabelas necessárias no banco de dados.

---

## 3. Ferramentas Usadas

O projeto utiliza tecnologias modernas de desenvolvimento web e desktop:

- **Electron**: Framework para criar aplicativos desktop com HTML, CSS e JS.
- **Node.js**: Ambiente de execução para o código do servidor.
- **Express**: Framework web para facilitar a criação de rotas e APIs.
- **MySQL**: Banco de dados relacional para armazenar tarefas e dados de usuários.
- **JWT (JSON Web Token)**: Para autenticação segura de usuários.
- **BcryptJS**: Para proteger as senhas dos usuários através de hashing.
- **Nodemon**: Ferramenta de desenvolvimento que reinicia o servidor automaticamente após mudanças.

---

## 4. Comandos Necessários

Para rodar o projeto localmente, siga estes passos:

### Configuração Inicial
1. **Instalar dependências (Raiz):**
   ```bash
   npm install
   ```
2. **Instalar dependências (Backend):**
   ```bash
   cd backend
   npm install
   ```

### Preparação do Banco de Dados
Certifique-se de que o MySQL está rodando e configure o arquivo `.env` na pasta `backend`. Em seguida, execute:
```bash
npm run migrate
```

### Execução
Você precisará de dois terminais abertos:

1. **Terminal 1 (Backend):**
   ```bash
   cd backend
   npm start
   ```
2. **Terminal 2 (Frontend):**
   ```bash
   # Na raiz do projeto
   npm start
   ```

---
*Este relatório foi gerado para documentar a estrutura e o funcionamento do projeto TrabalhoPA.*
