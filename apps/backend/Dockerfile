# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Archivos de configuración
COPY package*.json ./
COPY tsconfig*.json ./
COPY prisma ./prisma/

# Instalar dependencias
RUN npm install --legacy-peer-deps


# Copiar el resto del código
COPY . .

# Generar Prisma Client y el build de NestJS
RUN npx prisma generate
RUN npm run build

# Etapa 2: Producción
FROM node:20-alpine

WORKDIR /app

# Copiar build, dependencias y prisma estructurado
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./

# Puerto de exposición
EXPOSE 3002

# Iniciar la aplicación en modo producción
CMD ["npm", "run", "start:prod"]
