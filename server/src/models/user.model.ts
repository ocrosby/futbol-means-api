import mongoose, { Schema } from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose';

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
}

// Note: A post request should not contain unneeded parameters
export interface IUserCreationParams extends IUser {
  password: string
}

export interface IUserDocument extends IUser, mongoose.Document {}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
});

userSchema.plugin(passportLocalMongoose)

userSchema.index({ email: 1 });

// Virtual method
userSchema.virtual('fullName').get(function (this: IUserDocument) {
  return `${this.firstName} ${this.lastName}`
});

// Virtual method
userSchema.virtual('reverseName').get(function (this: IUserDocument) {
  return `${this.lastName}, ${this.firstName}`
});

export default mongoose.model('User', userSchema)


