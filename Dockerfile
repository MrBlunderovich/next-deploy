# syntax=docker.io/docker/dockerfile:1
# docker build -t next-sqlite .
# docker run -p 3201:3201 next-sqlite

FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
# shadcn requires --force with react 19 for the time being
RUN npm ci --force

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3201 \
    HOSTNAME="0.0.0.0" \
    DATABASE_URL="/app/db/sqlite3.db" \
    DRIZZLE_VERBOSE="true"

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs
 
RUN mkdir -p /app/.next && chown nextjs:nodejs /app/.next
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/src/drizzle/migrations ./src/drizzle/migrations
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts

# Ensure correct permissions for database
RUN mkdir -p /app/db && chown -R nextjs:nodejs /app/db
RUN mkdir -p /app/media && chown -R nextjs:nodejs /app/media

USER nextjs
EXPOSE 3201
CMD ["node", "server.js"]
