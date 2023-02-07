export interface IEvent {
    getTimestamp(): Date;
    setTimestamp(timestamp: Date): void;
}