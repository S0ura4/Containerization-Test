FROM node:24-alpine AS build

# Install required packages: curl, bash, unzip
RUN apk add --no-cache curl bash unzip

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash

# Set Bun in PATH
ENV PATH="/root/.bun/bin:$PATH"

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install NestJS CLI (optional)
RUN bun install -g @nestjs/cli

# Install dependencies and build the app
RUN bun install
RUN bun run build
