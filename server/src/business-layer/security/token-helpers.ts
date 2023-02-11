import * as config from 'config';
import * as express from 'express';
import { UserModel } from '../../data-layer/models/user.model';
import * as jwt from 'jsonwebtoken';
import { logger } from '../../middleware/common/logging';

const opts = {
  secretOrKey: config.get('auth.jwt_secret').toString(),
};

function createAuthToken(userId: string): string {
  const user = Object.assign({ userId: userId });
  const token = jwt.sign(user, config.get('auth.jwt_secret').toString(), {
    expiresIn: 60 * 60,
  });
  return token;
}

function verifyToken(token: any): any {
  try {
    return jwt.verify(token, opts.secretOrKey);
  } catch (err) {
    return new Error('Unable to access data as user cannot be verified ');
  }
}

export { createAuthToken, verifyToken };
