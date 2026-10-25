# ==============================================================================
# FoodRescue Backend — Multi-Stage Dockerfile (NestJS + Prisma + SWC)
# ==============================================================================

# Stage 1: Build Application and Generate Prisma Client
FROM node:20-alpine AS builder
RUN apk add --no-cache openssl libc6-compat
WORKDIR /app

# Install all dependencies (including devDependencies required for SWC and Prisma CLI)
COPY package.json package-lock.json ./
RUN npm ci

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy source code and build configs
COPY .swcrc tsconfig*.json ./
COPY src ./src

# Compile TypeScript to JavaScript with SWC
RUN npm run build

# Stage 2: Production Dependencies and Runtime Image
FROM node:20-alpine AS runner
RUN apk add --no-cache openssl libc6-compat
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

# Create dedicated non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

# Install production-only dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy Prisma schema and generated Prisma client/engines from builder
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client

# Copy compiled backend output
COPY --from=builder /app/dist ./dist

USER nestjs

EXPOSE 4000

CMD ["node", "dist/main.js"]
