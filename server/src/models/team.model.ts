import mongoose, { Schema } from 'mongoose'
import { IUserDocument } from './user.model'

export interface ITeam {
  name: string;
  season: string;
  owner: IUserDocument['_id']
}

export interface ITeamDocument extends ITeam, mongoose.Document {}

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

export const Team = mongoose.model<ITeamDocument>('Team', teamSchema);

export default Team;
