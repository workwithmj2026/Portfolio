# Stage 1: Build (Node — Vite needs Node compat)
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Production Runtime (Deno — no node_modules needed)
FROM denoland/deno:alpine AS runner
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/server.entry.deno.ts ./
COPY --from=builder /app/deno.json ./

EXPOSE 3000

USER deno

CMD ["run", "--allow-net", "--allow-read=./dist,./server", "--allow-env", "server.entry.deno.ts"]
