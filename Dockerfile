# syntax=docker.io/docker/dockerfile:1
# docker build -t next-deploy .
# docker run -p 3201:3201 next-deploy

FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

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
    DATABASE_URL="/app/db/sqlite3.db"

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs
 
COPY --from=builder /app/public ./public
RUN mkdir -p /app/.next && chown nextjs:nodejs /app/.next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/src/drizzle ./src/drizzle

# Ensure correct permissions for database
RUN mkdir -p /app/db && chown -R nextjs:nodejs /app/db

USER nextjs
EXPOSE 3201
# CMD ["node", "server.js"]
CMD npm run migrate && node server.js
