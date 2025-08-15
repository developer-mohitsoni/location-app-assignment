# Location App

This application allows users to upload location data, view it on a map, and manage their account. It is composed of a Node.js server and a Next.js web client.

## Prerequisites

- Node.js (v18 or higher)
- npm
- A running PostgreSQL database instance

## Setup Instructions

### Server

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the `server` directory by copying the `.env.example` file:
    ```bash
    cp .env.example .env
    ```
    Update the `.env` file with your database connection string and a JWT secret:
    ```
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    JWT_SECRET="your-secret-key"
    PORT=8000
    CLIENT_URL=http://localhost:3000
    ```

4.  **Apply database migrations:**
    ```bash
    npm run prisma:migrate
    ```

5.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The server will be running at `http://localhost:8000`.

### Web Client

1.  **Navigate to the web directory:**
    ```bash
    cd web
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The web client will be running at `http://localhost:3000`.

## Available Scripts

### Server

-   `npm run build`: Compiles the TypeScript code.
-   `npm run start`: Starts the compiled application.
-   `npm run dev`: Starts the development server with hot-reloading.
-   `npm run prisma:migrate`: Applies database migrations.
-   `npm run prisma:generate`: Generates the Prisma client.

### Web Client

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the application for production.
-   `npm run start`: Starts the production server.
-   `npm run lint`: Lints the codebase.
