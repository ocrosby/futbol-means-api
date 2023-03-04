import mongoose, { Schema } from 'mongoose'

export interface KeyValuePair {
  key: string,
  value: string
}

export interface Event extends mongoose.Document {
  type: string;
  timestamp: Date;
  meta: KeyValuePair[];
}

const eventSchema: Schema = new Schema({
  type: {
    type: String,
    enum: [
      'Goal',
      'Goal Against',
      'Save',
      'Kick Off',
      'Half Time',
      'End Of Match',
      'Foul',
      'Substitution',
      'Injury',
      'Corner Kick',
      'Free Kick',
      'Throw In',
      'Weather Delay',
      'Weather Cancellation'
    ],
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  meta: [{
    key: String,
    value: String
  }]
})

export const EventModel = mongoose.model<Event>('Event', eventSchema)
