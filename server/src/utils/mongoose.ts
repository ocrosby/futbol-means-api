import mongoose from 'mongoose'

export function getReadyState(): number {
  return mongoose.connection.readyState
}

export function getReadyStateMessage(): string {
  return translateReadyState(getReadyState());
}

export function isConnected(): boolean {
  const readyState = getReadyState();

  return readyState === 1;
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
