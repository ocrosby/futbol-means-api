import * as mongoose from 'mongoose';

export interface IEvent {
  type: string;
  timestamp: Date;
  key: string;
  value: string;
}

export interface IPlayerEvent extends IEvent {
  playerId: number;
}

export interface Goal extends IPlayerEvent {
  assistedBy: number[];
}

export interface Save extends IPlayerEvent {}
export interface KickOff extends IEvent {}
export interface HalfTime extends IEvent {}
export interface EndOfMatch extends IEvent {}

export interface Foul extends IPlayerEvent {

}

export interface Substitution extends IEvent {

}

export interface Injury extends IEvent {

}

export interface CornerKick extends IEvent {

}

export interface FreeKick extends IEvent {

}

export interface ThrowIn extends IEvent {

}

export const EventSchema = new mongoose.Schema({
  type: String,
  timestamp: Date,
  key: String,
  value: String
});

const Event = mongoose.model<IEvent & mongoose.Document>("Event", EventSchema);
export default Event;
