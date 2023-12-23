# Codex: Library Management System

## Overview

Codex is a library management system designed for the Free Software Club of the University of Córdoba. Built with a modern stack including Next.js, Prisma, and NextAuth, this project aims to streamline the management of library resources while ensuring a user-friendly experience.

## Features

- **User Authentication**: Secure login through email links.
- **Database Management**: Utilizing Prisma for efficient data handling.
- **Email Integration**: Email services for authentication and notifications.

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js
- A PostgreSQL server (can be set up using Docker)

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/aulasoftwarelibre/codex.git
   cd codex
   ```

2. **Environment Configuration**

   Copy the `.env` example file and customize the values:

   ```bash
   cp .env .env.local
   ```

   Update the following keys in your `.env.local` file:

    - `AUTH_SECRET`: A secret key for authentication.
    - `DATABASE_URL`: URL for your PostgreSQL database.
    - `MAILER_DSN`: SMTP server details.
    - `MAIL_FROM`: The email address to send mails from.
    - `MAILER_SECRET`: A secret key for the mailer.
    - `MAILER_URL`: URL for the mailer API.
    - `WEBMAIL_URL`: URL for the webmail service.

3. **Docker Setup**

   Use the provided `docker-compose.yaml` to set up the necessary services:

   ```bash
   docker-compose up -d
   ```

   This will start the necessary services:
    - SMTP server for email handling.
    - PostgreSQL database.
    - The Codex application.

4. **Running the Application**

   After setting up the environment, start the Codex application:

   ```bash
   npm install
   npm run dev
   ```

   Visit `http://localhost:3000` to access the application.

## License

This project is licensed under the [EUPL 1.2](LICENSE.md).

