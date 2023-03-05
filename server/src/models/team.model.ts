import mongoose, { Schema } from 'mongoose'
import { IUserDocument } from './user.model'

export interface Team extends mongoose.Document {
  name: string;
  season: string;
  owner: IUserDocument['_id'];
}

const teamSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  season: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: false
  }
})

export const TeamModel = mongoose.model<Team>('Team', teamSchema);
