import * as mongoose from "mongoose";

export interface Team {
  name: string;
  season: string;
}

export interface TeamDoc extends Document, Team {}

export const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  season: {
    type: String,
    required: true,
    trim: true
  }
});

export const TeamModel = mongoose.model<TeamDoc>("Team", TeamSchema);

export default TeamModel;
