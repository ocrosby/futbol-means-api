import mongoose, { Document } from 'mongoose';

export interface Player {
  name: string;
  team: string;
  jerseyNumber: number;
  grade: number;
  height: string;
  weight: number;
  positions: string[];
}

export interface PlayerDoc extends Document, Player {}

export const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  team: String,
  jerseyNumber: Number,
  grade: Number,
  height: String,
  weight: Number,
  positions: [String]
});

export const PlayerModel = mongoose.model<PlayerDoc>('Player', PlayerSchema);

export default PlayerModel;
