import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import passportLocalMongoose from 'passport-local-mongoose';
import {HookNextFunction} from "../utils/interfaces";

export interface User extends mongoose.Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
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

userSchema.plugin(passportLocalMongoose)

userSchema.index({ email: 1 });

// Virtual method
userSchema.virtual('fullName').get(function (this: User) {
  return `${this.firstName} ${this.lastName}`
});

// Virtual method
userSchema.virtual('reverseName').get(function (this: User) {
  return `${this.lastName}, ${this.firstName}`
});

// When the user registers
userSchema.pre(
  'save',
  async function (this: User, next: HookNextFunction) {
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
  const user = this as User

  return bcrypt.compare(candidatePassword, user.password).catch((_err) => false)
}

export const UserModel = mongoose.model<User>('User', userSchema);

// Export the model and return your IUser interface
export default UserModel;
