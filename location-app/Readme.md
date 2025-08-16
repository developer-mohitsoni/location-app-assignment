# Location App

This application allows users to upload location data, view it on a map, and manage their account. It is composed of a Node.js server and a Next.js web client.

## Prerequisites

- Docker
- Docker Compose

## Running with Docker

To run the application using Docker, follow these steps:

1.  **Build and start the services:**
    ```bash
    docker-compose up --build
    ```
    This command will build the Docker images for the server and web client and start all the services defined in the `docker-compose.yml` file.

2.  **Apply database migrations:**
    Open a new terminal and run the following command to apply the database migrations:
    ```bash
    docker-compose exec server npm run prisma:migrate
    ```

The application will be available at `http://localhost:3000`.
The server will be running at `http://localhost:8000`.

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

## Usage

1.  **Prepare the location data:**
    Create a `.txt` file with location data in the following format:
    ```
    Name,Latitude,Longitude
    ```
    Each line should represent a different location. For example:
    ```
    New York,40.7128,-74.0060
    London,51.5074,-0.1278
    Tokyo,35.6895,139.6917
    ```

2.  **Create a ZIP file:**
    Compress the `.txt` file into a ZIP archive named `location.zip`. The ZIP file must contain only this single `.txt` file.

3.  **Upload the file:**
    -   Navigate to the upload page in the web application.
    -   Select the `location.zip` file and click "Upload".
    -   The application will process the file and display the locations on the map.
