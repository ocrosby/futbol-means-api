import mongoose, { Schema } from 'mongoose'

export interface IKeyValuePair {
  key: string;
  value: string;
}

export interface IEvent {
  type: string;
  meta: IKeyValuePair[];
}

export interface IEventDocument extends IEvent, mongoose.Document {}

const eventSchema: Schema = new Schema({
  type: {
    type: String,
    enum: [
      'Goal',
      'Save',
      'Kick Off',
      'Half Time',
      'End Of Match',
      'Foul',
      'Substitution',
      'Injury',
      'Corner Kick',
      'Free Kick',
      'Throw In'
    ],
    required: true
  },
  meta: [{
    key: String,
    value: String
  }]
}, {
  timestamps: true  // Mongoose will add two properties of type Date createdAt and updatedAt
})

const Event = mongoose.model('Event', eventSchema)

export default Event
