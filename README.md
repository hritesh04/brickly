# Brickly

A visual game editor built with Next.js, featuring an intuitive drag-and-drop interface for creating games without coding.

## Features

- Visual game editor with canvas-based interface
- Node-based scene editor

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- npm

### Environment Setup

##### docker-compose coming soon

1. Copy the environment variables:

```bash
cp .env.example .env
```

2. Update the environment variables in `.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/brickly"
JWT_SECRET="your-super-secret-jwt-key-here"
OBJECT_STORE_URL=http://127.0.0.1:9000
```

3. Set up the database:

```bash
npx prisma generate
npx prisma db push
```

4. Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available Routes

- `/` - Landing page
- `/signin` - Sign in page
- `/signup` - Sign up page
- `/dashboard` - User dashboard
- `/editor/[id]` - Game editor
