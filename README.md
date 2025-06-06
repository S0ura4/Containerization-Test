# Containerization-Test

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original-wordmark.svg" width="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bun/bun-original.svg" width="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="40"/>
  <img src="https://cdn.simpleicons.org/socketdotio/010101/white" width="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" width="40"/>
  <img src="https://nestjs.com/img/logo-small.svg" width="40"/>
</p>

<p align="center">
  <b>Modern Full-Stack Containerized Template</b><br/>
  Orchestrated with Docker & Docker Compose
</p>

---

## > Overview

**Containerization-Test** is a full-stack containerized boilerplate that uses:

- **Bun** & **Node.js** for server-side JS
- **NestJS** as the backend framework
- **Socket.io** for real-time comms
- **PostgreSQL** as a database
- **NGINX** as a reverse proxy
- **Docker** + **Docker Compose** for orchestration

---

## > Tools Used

| Tool           | Icon                                                                                                               | Description                   |
| -------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------- |
| Docker         | `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="24"/>`          | Containerization platform     |
| Docker Compose | `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original-wordmark.svg" width="24"/>` | Multi-container orchestration |
| Bun            | `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bun/bun-original.svg" width="24"/>`                | Modern JavaScript runtime     |
| Node.js        | `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="24"/>`          | JavaScript runtime            |
| Socket.io      | `<img src="https://cdn.simpleicons.org/socketdotio/010101/white" width="24"/>`                                   | Real-time communication       |
| PostgreSQL     | `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="24"/>`  | SQL database                  |
| NGINX          | `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" width="24"/>`            | HTTP reverse proxy            |
| NestJS         | `<img src="https://nestjs.com/img/logo-small.svg" width="24"/>`                                                  | Backend framework             |

---

## ⚡ Quick Start

> 📝 **Note:** No need to run `bun install` or `npm install`. Docker handles everything.

### 1. Clone the Repo

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

## > Key Files & Structure

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

## > Notes

- **No manual local installation needed!**All dependencies are installed in the containers when you run Docker Compose.
- **Main files to edit for configuration:**
  - `Dockerfile`
  - `docker-compose.yml`
  - `.env` (copied from `example.env`)
  - `nginx.conf`

---

## > Contributing

Pull requests, issues, and suggestions are welcome!

---

## > License

This project is licensed under the [MIT License](LICENSE).

---

## > References

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Docs](https://docs.docker.com/compose/)
- [Bun](https://bun.sh/)
- [NestJS](https://nestjs.com/)
- [Socket.io](https://socket.io/)
- [Postgres](https://www.postgresql.org/)
- [NGINX](https://nginx.org/)
