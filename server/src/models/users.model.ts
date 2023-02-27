import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'
import passportLocalMongoose from 'passport-local-mongoose';
import {HookNextFunction} from "../utils/interfaces";

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  // fullName: string;
  // reverseName: string;
  createdAt: Date;
  updatedAt: Date;
  // comparePassword(candidatePassword: string): Promise<boolean>;
}

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

userSchema.index({ email: 1 });

// Virtual method
userSchema.virtual('fullName').get(function (this: IUser) {
  return `${this.firstName} ${this.lastName}`
});

// Virtual method
userSchema.virtual('reverseName').get(function (this: IUser) {
  return `${this.lastName}, ${this.firstName}`
});

// When the user registers
userSchema.pre(
  'save',
  async function (this: IUser, next: HookNextFunction) {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
      return next()
    }

    // Random additional data
    const salt = await bcrypt.genSalt(10)

    this.password = bcrypt.hashSync(this.password, salt)

    return next()
  }
)

// Compare a candidate password with the user's password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  // So we don't have to pass this into the interface method
  const user = this as IUser;

  return bcrypt.compare(candidatePassword, user.password).catch((_err) => false)
}

userSchema.plugin(passportLocalMongoose)

// Export the model and return your IUser interface
export default mongoose.model<UserInput>('User', userSchema);
