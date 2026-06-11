# Realtime Chat System

A scalable real-time collaborative workspace platform built with GraphQL, Socket.IO, Redis Pub/Sub, PostgreSQL, Prisma, Docker, automated testing, CI/CD, and Fly.io deployment.

## Features

* JWT Authentication
* Workspace Management
* Role-Based Permissions
* Real-Time Messaging
* Redis Pub/Sub Communication
* Horizontal Scaling Support
* GraphQL API
* PostgreSQL Database
* Prisma ORM
* Dockerized Infrastructure
* Unit Tests
* Integration Tests
* Automated CI/CD Pipeline
* Production Deployment with Fly.io

## Tech Stack

### Backend

* Node.js
* Express
* Apollo GraphQL
* Socket.IO

### Database

* PostgreSQL
* Prisma ORM

### Caching & Messaging

* Redis
* Redis Pub/Sub

### DevOps

* Docker
* Docker Compose
* GitHub Actions
* Fly.io

### Testing

* Jest
* Supertest

## Architecture

The application uses a distributed architecture where multiple API instances communicate through Redis Pub/Sub.

Client
→ GraphQL API
→ Service Layer
→ Prisma
→ PostgreSQL

Socket.IO
→ Redis Pub/Sub
→ Multiple API Instances

This architecture enables horizontal scaling while maintaining real-time communication across all connected clients.

## Testing

The project includes:

* Unit Tests
* Integration Tests
* Mocked Redis Testing
* Database Integration Testing
* Automated GitHub Actions Workflow

All tests run automatically on every push and pull request.

## CI/CD

The project uses GitHub Actions for continuous integration and deployment.

Pipeline:

1. Install Dependencies
2. Generate Prisma Client
3. Run Database Migrations
4. Execute Unit Tests
5. Execute Integration Tests
6. Deploy to Fly.io (only if all tests pass)

## Local Development

### Prerequisites

* Node.js
* Docker
* Docker Compose

### Installation

```bash
git clone <repository-url>
cd Realtime-Chat-System
```

```bash
cd api-services
npm install
```

### Start Services

```bash
docker-compose up -d
```

### Run Migrations

```bash
npx prisma migrate deploy
```

### Start Application

```bash
npm start
```

## Environment Variables

```env
DATABASE_URL=
REDIS_URL=
JWT_SECRET=
```

## Future Improvements

* Direct Messaging
* File Attachments
* Message Reactions
* Presence Tracking
* Read Receipts
* Monitoring & Metrics

## Author

Adrian Peshev
