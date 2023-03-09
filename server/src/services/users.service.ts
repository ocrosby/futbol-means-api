import {IUser, IUserDocument} from '../models/user.model'

import UserRepo from '../repos/user.repo'
import { nullable } from "../types/nullable";

import {IPatchOperation} from "../interfaces/patch.interface";

function get(id: string): Promise<nullable<IUserDocument>> {
  return UserRepo.get(id);
}

function getByEmail(email: string): Promise<nullable<IUserDocument>> {
  return UserRepo.getByEmail(email);
}

function getAll(): Promise<IUserDocument[]> {
  return UserRepo.getAll();
}

function addOne(user: IUser, password: string): Promise<IUserDocument> {
  return UserRepo.add(user, password);
}

async function updateOne(id: string, user: IUser): Promise<nullable<IUserDocument>> {
  const persists = await UserRepo.persists(id);

  if (!persists) {
    return Promise.reject(`Could not find a user with id ${id} when attempting to update a user!`)
  }

  return await UserRepo.modify(id, user);
}

async function _delete(id: string): Promise<void> {
  const persists = await UserRepo.persists(id);

  if (!persists) {
    return Promise.reject(`Could not find a user with id ${id} when attempting to delete a user!`)
  }

  return await UserRepo.delete(id);
}

async function patch(id: string, patches: IPatchOperation[]): Promise<void> {
  const persists = await UserRepo.persists(id);

  if (!persists) {
    return Promise.reject(`Could not find a user with id ${id} when attempting to patch a user!`)
  }

  return await UserRepo.patch(id, patches);
}

export default {
  get,
  getByEmail,
  getAll,
  addOne,
  updateOne,
  patch,
  delete: _delete
} as const;
