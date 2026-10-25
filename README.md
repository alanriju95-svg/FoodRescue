# 🍱 FoodRescue

### Rescue Food • Reduce Waste • Feed Hope ❤️

FoodRescue is a modern, full-stack, web-based **surplus food redistribution platform** that seamlessly connects people and organizations with surplus food to active volunteers and community receivers.

The platform coordinates the entire lifecycle of food donations — from initial posting by donors, request approval by receivers, route acceptance by volunteers, through to delivery confirmation and impact analytics.

---

## 🚀 Latest Updates & Changelog

### ☁️ Supabase Cloud Database Integration
- **Managed PostgreSQL**: Seamlessly migrated from local database dependencies to high-availability managed PostgreSQL on **Supabase**.
- **Prisma Dual Connection Architecture**: Configured Prisma schema with `DATABASE_URL` (PgBouncer transaction connection pooling on port 6543) and `DIRECT_URL` (direct PostgreSQL connection on port 5432 for schema migrations and CLI operations).
- **Graceful Token & Session Recovery**: Enhanced the frontend GraphQL client to detect database switches and expired sessions, automatically clearing stale tokens and redirecting cleanly to login.

### 🐳 Full Docker & Containerization Stack
- **Root Docker Compose Orchestration**: Unified multi-container orchestration (`docker-compose.yml`) running both the frontend and backend services on an isolated bridge network (`foodrescue_network`).
- **Multi-Stage Production Dockerfiles**:
  - `backend/Dockerfile`: Multi-stage build leveraging `node:20-alpine`, caching dependencies, running Prisma client generation, building with SWC, and running as an unprivileged `nestjs` user for maximum security.
  - `frontend/Dockerfile`: Multi-stage build leveraging `node:20-alpine`, building Next.js 16 standalone assets, and running under a dedicated unprivileged `nextjs` user.
- **Optimized Build Contexts**: Added tailored `.dockerignore` files in both backend and frontend repositories to minimize build context transfer and accelerate builds.

### ⚡ SWC Build System & Enhanced Tooling
- **SWC Compilation**: Replaced traditional `tsc` compilation with ultra-fast **SWC (Speedy Web Compiler)** for the NestJS backend, speeding up build and development reloads significantly.
- **Next-Gen Tooling**: Integrated **Oxlint** for lightning-fast Rust-based static linting and **Vitest** for rapid unit and end-to-end testing suites.
- **Role Guards & Layout Polish**: Refined role-based layout protections and state persistence across donor, receiver, and volunteer dashboards.

---

## 🛠️ Detailed Tech Stack Overview

### 🎨 Frontend Architecture
| Technology | Version | Purpose & Highlights |
| :--- | :--- | :--- |
| **Next.js** | `16.3.5` | React Framework utilizing App Router, Server Components, client hydration, dynamic nested routing, and fast route transitions. |
| **React** | `19.2.8` | Core UI library providing concurrent rendering, modern hooks, and state management. |
| **TypeScript** | `^5` | Strict static typing for resilient UI logic, component props, and API response contracts. |
| **Lucide React** | `^1.47.0` | Comprehensive, consistent icon library used across dashboards, navigation, status indicators, and actions. |
| **Design System** | Custom CSS | Clean, modern UI system featuring glassmorphism, responsive navigation bars, role-specific sidebars, status badges, and interactive stepper timelines. |
| **Client Auth & State** | React Context | `AuthContext` provides centralized JWT storage in `localStorage`, role-based route guards (`RoleGuard`), and immediate redirect logic. |
| **Data Fetching** | Native Fetch / GraphQL | Lightweight custom GraphQL execution client with bearer token injection and automated error handling. |

### ⚙️ Backend Architecture
| Technology | Version | Purpose & Highlights |
| :--- | :--- | :--- |
| **NestJS** | `12.0.1` | Modular, enterprise-grade Node.js server framework following standard MVC/Clean architecture patterns. |
| **GraphQL & Apollo** | Apollo `5.5.1` / `@nestjs/graphql` `14.0.1` | Code-first GraphQL schema generation (`schema.gql`), automated type generation, queries, and mutations. |
| **Prisma ORM** | `6.19.3` | Type-safe database access layer, schema migrations, and automated client generation with relationship management. |
| **SWC Compiler** | `@swc/core` `1.16.20` | Extensible Rust-based compilation engine delivering blazing-fast build and hot-reload times. |
| **Passport & JWT** | `passport-jwt` `4.0.1` | Secure authentication with stateless JSON Web Tokens, custom decorators (`@CurrentUser`, `@Roles`), and GraphQL execution guards (`GqlAuthGuard`, `RolesGuard`). |
| **Password Security** | `bcrypt` `6.0.0` | Secure cryptographic salt generation and password hashing. |
| **Validation** | `class-validator` / `class-transformer` | Strict DTO input validation on all GraphQL mutations and query arguments. |
| **Code Quality** | `oxlint` `1.58.0` & `vitest` `4.1.2` | High-speed Rust linting and modern unit/E2E test runners. |

### 🗄️ Database & Cloud Infrastructure
| Component | Provider / Tool | Details |
| :--- | :--- | :--- |
| **Cloud Database** | **Supabase** (PostgreSQL) | Managed PostgreSQL instance with high availability, SSL encryption, and automated backups. |
| **Connection Pooling** | PgBouncer (`port 6543`) | Handles high concurrency and scalable serverless/containerized connections. |
| **Direct Connection** | Direct Postgres (`port 5432`) | Used for Prisma migrations (`prisma db push`) and database seeding. |
| **Containerization** | Docker & Docker Compose | Multi-stage lightweight Alpine container images running with isolated user permissions. |

---

## 🌍 Why FoodRescue?

Every day, large amounts of fresh, quality food from restaurants, grocers, caterers, and events go to waste, while vulnerable community members face food insecurity.

FoodRescue bridges this gap with a real-time, transparent logistics coordination platform:

* 🍽️ **Donors** easily list surplus food with categories, quantities, expiry windows, and pickup addresses.
* 🛵 **Volunteers** view open delivery routes, accept transport tasks, and provide delivery verification.
* 🤝 **Receivers** browse available food, submit requests, and track food distribution in real-time.

---

## ✨ Key Features by Role

### 🍱 For Donors
- **List Surplus Food**: Specify quantity, category (Cooked Meals, Bakery, Produce, Dairy/Eggs, Packaged, Beverages), storage requirements, and expiry deadlines.
- **Pickup Scheduling**: Set exact pickup location, availability windows, and deadline times.
- **Track Status**: Real-time visibility into whether a donation is requested, assigned, in transit, or delivered.
- **Donation History & Analytics**: View cumulative impact metrics, historical donations, and active listings.

### 🛵 For Volunteers
- **Task Discovery**: Discover available food donations awaiting pickup in the volunteer portal.
- **Task Acceptance**: Claim pickup assignments matching available transportation (car, bike, van, on-foot).
- **Trip Workflow**: One-click updates for "Picked Up" and "Delivered" with timestamped confirmation.
- **Impact Tracking**: Track completed rescue runs and delivery history.

### 🍽️ For Receivers (Shelters, Families, Food Banks)
- **Browse Food Catalog**: Search and filter available donations by food type and proximity.
- **Submit Requests**: Request needed portions and provide drop-off delivery addresses.
- **Delivery Monitoring**: Monitor delivery stages with visual step-by-step progress tracking.
- **Delivery Confirmation**: Acknowledge receipt of food donations and confirm delivery.

---

## 🔄 End-to-End Fulfillment Lifecycle

```text
    ┌──────────────┐
    │ 🍱 DONOR     │  Posts Surplus Food (Quantity, Expiry, Pickup Address)
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │  AVAILABLE   │  Listed on the food board for eligible receivers
    └──────┬───────┘
           │
           │  Receiver submits request with delivery address
           ▼
    ┌──────────────┐
    │  REQUESTED   │  Food reserved for the requesting receiver
    └──────┬───────┘
           │
           │  Volunteer accepts pickup route
           ▼
    ┌──────────────┐
    │PICKUP ASSIGNED│ Volunteer assigned & en route to donor
    └──────┬───────┘
           │
           │  Volunteer collects food from donor
           ▼
    ┌──────────────┐
    │  PICKED UP   │  Food in transit to receiver
    └──────┬───────┘
           │
           │  Volunteer drops off food at receiver
           ▼
    ┌──────────────┐
    │  DELIVERED   │  Drop-off complete; awaiting final confirmation
    └──────┬───────┘
           │
           │  Receiver confirms delivery receipt
           ▼
    ┌──────────────┐
    │  COMPLETED   │  Mission accomplished! Food saved & documented 🎉
    └──────────────┘
```

---

## 📁 Repository Structure

```text
FoodRescue/
├── docker-compose.yml              # Root Docker Compose (Frontend + Backend + Cloud DB)
├── README.md                       # Project documentation
│
├── backend/                        # NestJS GraphQL API
│   ├── Dockerfile                  # Multi-stage production container definition
│   ├── .dockerignore               # Docker build exclusions
│   ├── .swcrc                      # Speedy Web Compiler configuration
│   ├── nest-cli.json               # NestJS CLI configuration
│   ├── oxlint.json                 # Oxlint configuration
│   ├── package.json                # Dependencies, scripts, and package metadata
│   ├── prisma/
│   │   ├── schema.prisma           # Prisma schema (PostgreSQL / Supabase models)
│   │   └── seed.ts                 # Database seeder (Demo accounts & sample data)
│   └── src/
│       ├── main.ts                 # API bootstrap, CORS, validation pipes
│       ├── app.module.ts           # Root NestJS application module
│       ├── schema.gql              # Auto-generated GraphQL schema
│       ├── auth/                   # JWT auth, Passport strategy, GqlAuthGuard, RolesGuard
│       ├── users/                  # User accounts, profiles, role management
│       ├── donations/              # Donation listing, updates, status transitions
│       ├── requests/               # Food request handling and approval workflows
│       ├── pickups/                # Volunteer task dispatching, route updates
│       ├── deliveries/             # Delivery confirmation and proof
│       ├── common/                 # Enums, DTOs, global stats
│       └── prisma/                 # PrismaService injectable database wrapper
│
└── frontend/                       # Next.js 16 Web Application
    ├── Dockerfile                  # Multi-stage production container definition
    ├── .dockerignore               # Docker build exclusions
    ├── package.json                # Dependencies and build scripts
    ├── next.config.ts              # Next.js configuration
    └── src/
        ├── app/
        │   ├── layout.tsx          # Root layout and theme wrapper
        │   ├── page.tsx            # Landing page with impact statistics & CTA
        │   ├── login/              # Login screen with test credential quick-fill
        │   ├── signup/             # Multi-role registration (Donor, Volunteer, Receiver)
        │   ├── donor/              # Donor portal (Dashboard, Create, Listings, History)
        │   ├── volunteer/          # Volunteer portal (Dashboard, Available Tasks, Active Deliveries)
        │   └── receiver/           # Receiver portal (Food Marketplace, Requests, History)
        ├── components/             # Reusable UI (Navbar, Footer, Sidebar, StatCard, LifecycleStepper)
        └── lib/
            ├── auth-context.tsx    # Role authentication context & token manager
            ├── graphql-client.ts   # GraphQL client with auto token handling
            └── graphql-queries.ts  # Pre-compiled GraphQL queries and mutations
```

---

## ⚙️ Getting Started

You can run FoodRescue either using **Docker Compose** (recommended for production or quick setup) or by running the **services locally** in development mode.

### Prerequisites
- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher
- **Docker & Docker Compose**: (Optional, for containerized execution)
- **Supabase Account**: A PostgreSQL database connection URI

---

### Method 1: Running with Docker Compose (Recommended)

1. **Configure Environment Variables**:
   Create or verify `backend/.env` with your Supabase credentials:
   ```env
   PORT=4000
   NODE_ENV=production
   JWT_SECRET=supersecret_foodrescue_jwt_key_2026
   DATABASE_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].supabase.com:5432/postgres"
   ```

2. **Build and Launch Containers**:
   ```bash
   docker compose up --build -d
   ```

3. **Verify Container Health**:
   ```bash
   docker compose ps
   ```

4. **Access the Applications**:
   - **Frontend App**: [http://localhost:3000](http://localhost:3000)
   - **Backend GraphQL API & Playground**: [http://localhost:4000/graphql](http://localhost:4000/graphql)

---

### Method 2: Running Locally for Development

#### 1. Backend Setup (NestJS + Prisma)

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Configure backend/.env
# Copy the example or enter your Supabase connection strings:
# DATABASE_URL="postgresql://..."
# DIRECT_URL="postgresql://..."
# JWT_SECRET="your_jwt_secret"

# Push schema changes to Supabase
npm run db:push

# (Optional) Seed the database with demo users and sample donations
npm run db:seed

# Start backend in SWC hot-reload development mode
npm run start:dev
```
The GraphQL server will be listening at **`http://localhost:4000/graphql`**.

#### 2. Frontend Setup (Next.js 16)

```bash
# Open a new terminal and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Create frontend/.env.local (optional if using default port 4000)
# NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql

# Start Next.js development server
npm run dev
```
Open **`http://localhost:3000`** in your browser.

---

## 🔑 Demo Credentials (from Seed Data)

If you ran `npm run db:seed`, the database will be populated with the following demo accounts for testing:

| Role | Email | Password | Description |
| :--- | :--- | :--- | :--- |
| **Donor** | `donor@example.com` | `password123` | Bakeries & restaurants with active surplus donations |
| **Volunteer** | `volunteer@example.com` | `password123` | Community couriers with assigned pickup routes |
| **Receiver** | `receiver@example.com` | `password123` | Community centers & shelters requesting food |

---

## 🧪 Testing & Code Quality

Both packages include testing and linting toolchains:

```bash
# Backend linting with Oxlint
cd backend && npm run lint

# Backend unit & integration tests with Vitest
cd backend && npm run test

# Frontend linting with ESLint
cd frontend && npm run lint
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
