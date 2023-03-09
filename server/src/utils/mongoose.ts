import mongoose from 'mongoose'

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DB
} = process.env

export const options: mongoose.ConnectOptions = {
  authSource: "admin",
  user: MONGO_USER,
  pass: MONGO_PASSWORD,
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintains up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // close sockets after 45 seconds of inactivity
  family: 4 // use IPV4, skip trying IPv6
}

export function generateDatabaseUri(): string {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`
}

export function getReadyState(): number {
  return mongoose.connection.readyState
}

export function getReadyStateMessage(): string {
  return exports.translateReadyState(exports.getReadyState());
}

export function isConnected(): boolean {
  return exports.getReadyState() === 1;
}

export function translateReadyState(readyState: number): string {
  switch(readyState) {
    case 0:
      return 'disconnected'
    case 1:
      return 'connected'
    case 2:
      return 'connecting'
    case 3:
      return 'disconnecting'
    default:
      return 'unknown'
  }
}
