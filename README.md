# Custom CMS API

Custom CMS API is a RESTful API built with NestJS, providing endpoints to manage blog posts, comments, user authentication, and user management.

## Features

- Create, read, update, and delete blog posts (`/post` endpoints)
- Create, read, update, and delete comments (`/comment` endpoints)
- User registration and authentication (`/auth` endpoints)
- User management features (promote, demote, ban users)
- JWT-based authentication and authorization
- Swagger API documentation for easy exploration and testing

## Installation

Clone the repository:

"""bash
git clone https://github.com/Cesar-Marcano/Custom-CMS.git
"""

Install dependencies:

"""bash
cd Custom-CMS
pnpm install
"""

Set up environment variables:

"""bash
# Rename .env.example to .env and update the variables
cp .env.example .env
"""

## Running the App

"""bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
"""

The API will be available at `http://localhost:3000`.

## API Documentation

Explore the API endpoints and schemas using Swagger UI:

"""bash
# After starting the app, visit the following URL in your browser
http://localhost:3000/api
"""

## Environment Variables

- `DATABASE`: Database URL of the server (MySQL)
- `JWT_SECRET`: Secret key for JWT token generation

## Technologies Used

- **NestJS**: Framework for building efficient, scalable Node.js server-side applications
- **Prisma**: Modern database access toolkit for TypeScript and Node.js
- **Swagger**: API documentation and exploration tool
- **JWT**: JSON Web Token for secure authentication

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
