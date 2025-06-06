# Containerization-Test

[![Docker](https://img.shields.io/badge/Docker-blue?logo=docker)](https://www.docker.com/)
[![Docker Compose](https://img.shields.io/badge/Docker%20Compose-blue?logo=docker)](https://docs.docker.com/compose/)
[![Bun](https://img.shields.io/badge/Bun-black?logo=bun)](https://bun.sh/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-black?logo=socket.io)](https://socket.io/)
[![Postgres](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![NGINX](https://img.shields.io/badge/NGINX-009639?logo=nginx&logoColor=white)](https://nginx.org/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)](https://nestjs.com/)

---

## 🚀 Overview

**Containerization-Test** is a comprehensive template for running a modern full-stack application stack in Docker. It demonstrates the use of:
- Bun & Node.js for server-side JavaScript/TypeScript
- NestJS as a backend framework
- Socket.io for real-time communication
- PostgreSQL as a database
- NGINX as a reverse proxy

Everything is orchestrated with Docker and Docker Compose for a seamless local development experience.

---

## 🛠️ Tools Used

| Tool         | Description                                  |
|--------------|----------------------------------------------|
| ![Docker](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg) | Containerization platform |
| ![Docker Compose](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original-wordmark.svg) | Multi-container orchestration |
| ![Bun](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bun/bun-original.svg) | Modern JavaScript runtime |
| ![Node.js](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg) | JavaScript runtime |
| ![Socket.io](https://cdn.simpleicons.org/socketdotio/010101/white) | Real-time communication |
| ![Postgres](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg) | SQL database |
| ![NGINX](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg) | HTTP reverse proxy |
| ![NestJS](https://nestjs.com/img/logo-small.svg) | Backend framework |

---

## ⚡ Quick Start

> **Note:**  
> _You do **not** need to run `bun install` or `npm install` manually. All dependencies and build steps are handled inside Docker containers. The only requirements on your machine are Docker and Docker Compose._

### 1. Clone the Repository

```bash
git clone https://github.com/S0ura4/Containerization-Test.git
cd Containerization-Test
```

### 2. Copy & Edit Environment Variables

Copy the example environment file and edit as needed:
```bash
cp example.env .env
```
Update any secrets or configuration in `.env` before running the stack.

### 3. Run the Project

```bash
docker compose up --build
```
This command will:
- Build all relevant images
- Start all services (backend, database, nginx, etc.)
- Automatically install dependencies and launch the app

### 4. Accessing the Application

- The main backend/API will be available at: `http://localhost:3000`
- The frontend (if included) and other services will be accessible at the ports specified in `docker-compose.yml` and `nginx.conf`.

### 5. Stopping the Project

To shut down all containers:
```bash
docker compose down
```

---

## 📁 Key Files & Structure

```text
Containerization-Test/
├── Dockerfile             # Application build & runtime definition
├── docker-compose.yml     # Service orchestration and dependencies
├── example.env            # Example environment variable definitions
├── nginx.conf             # NGINX reverse proxy configuration
├── src/                   # Application source code
└── ...
```

---

## 📝 Notes

- **No manual local installation needed!**  
  All dependencies are installed in the containers when you run Docker Compose.
- **Main files to edit for configuration:**  
  - `Dockerfile`
  - `docker-compose.yml`
  - `.env` (copied from `example.env`)
  - `nginx.conf`

---

## 🤝 Contributing

Pull requests, issues, and suggestions are welcome!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🔗 References

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Docs](https://docs.docker.com/compose/)
- [Bun](https://bun.sh/)
- [NestJS](https://nestjs.com/)
- [Socket.io](https://socket.io/)
- [Postgres](https://www.postgresql.org/)
- [NGINX](https://nginx.org/)
