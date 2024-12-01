# Projeto Final Restic 36

Este projeto é dividido em duas partes principais: **Frontend** e **Backend**. Siga as instruções abaixo para configurar e executar ambos os projetos.

---

## Estrutura do Projeto

- **`frontend.2/`**: Contém o código do cliente (React Native).
- **`backend/`**: Contém o código do servidor, utilizando o `json-server`.

---

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org) (versão recomendada: 16+)
- [Yarn](https://yarnpkg.com) (para o frontend)
- [npm](https://www.npmjs.com) (vem com o Node.js, para o backend)

---

## Como Executar

### 1. Iniciar o Backend

1. Navegue até a pasta do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   cd backend
   ```

3. Inicie o servidor:
   ```bash
   npx json-server --watch db.json --port 3000
   ```

4. O servidor estará disponível em:
- Endpoint de Vagas: 
**`http://localhost:3000/vagas`**
- Endpoint de Usuários: 
**`http://localhost:3000/usuarios`**

### 1. Iniciar o Backend

1. Navegue até a pasta do frontend:
   ```bash
   cd frontend.2
   ```
2. Instale as dependências:
   ```bash
   yarn install
   ```
3. Inicie o cliente:
   ```bash
   yarn start
   ```

## Notas
- O **`json-server`** utiliza o arquivo **`db.json`** no diretório do backend para simular a API. Certifique-se de que ele está configurado corretamente com os dados iniciais necessários.
- Certifique-se de que o backend esteja em execução antes de usar o frontend, para garantir que os endpoints estejam acessíveis.
- Certifique-se substituir a url do arquivo **`./frontend.2/src/services/api.ts`**, para o seu IP, assim o frontend irá conseguir fazer conexão com o backend.
