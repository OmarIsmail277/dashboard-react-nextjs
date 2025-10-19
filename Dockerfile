# ==============================
# Stage 1: Build the app
# ==============================
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build Next.js app
RUN npm run build

# ==============================
# Stage 2: Run the app
# ==============================
FROM node:20-alpine AS runner

WORKDIR /app

# Copy everything needed from builder
COPY --from=builder /app ./

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
