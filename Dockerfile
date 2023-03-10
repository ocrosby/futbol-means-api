FROM node:18.14.0-alpine AS builder
WORKDIR /app
COPY . .
RUN apk update && apk upgrade && apk add make
RUN make dist

FROM node:18.14.0-alpine AS runner
COPY --from=builder /app/dist /
EXPOSE 8000
CMD ["node", "server.js"]
