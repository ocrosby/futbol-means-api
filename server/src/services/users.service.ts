import {IUser, IUserDocument} from '../models/user.model'

import { nullable } from "../types/nullable";

import {IPatchOperation} from "../interfaces/patch.interface";

import User from '../models/user.model'
import jsonpatch from "jsonpatch";

async function get(id: string): Promise<nullable<IUserDocument>> {
  return User.findOne({_id: id})
}

async function getByEmail(email: string): Promise<nullable<IUserDocument>> {
  return User.findOne({email: email})
}

async function getAll(): Promise<IUserDocument[]> {
  return User.find({})
}

async function addOne(userCreationParams: IUser, password: string): Promise<IUserDocument> {
  const document = await getByEmail(userCreationParams.email);

  if (document) {
    // The current email address is already present.
    return Promise.reject(`A user with the email address "${userCreationParams.email}" already exits!`)
  }

  const newUser = new User(userCreationParams);

  try {
    await User.register(newUser, password);

    return newUser;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function updateOne(id: string, data: IUser): Promise<nullable<IUserDocument>> {
  // Note: replaceOne() replaces the first matching document in the colleciton that
  // matches the filter, using the replacement document
  //
  // If upsert: true and no documents match the filter it creates a new document
  // based on the replacement document

  // https://www.mongodb.com/docs/manual/reference/method/db.collection.replaceOne/
  const modificationResult = await User.replaceOne({_id: id}, data, { upsert: true })

  // replaceOne returns a resulting document containing
  // * a boolean acknowledged as true if the operation ran with write concern or false if write concern was disabled
  // * matchedCount containing the number of matched documents
  // * modifiedCount containing the number of modified documents
  // * upsertedId containing the _id for the upserted document

  if (modificationResult.matchedCount) {
    return await get(id); // The id was matched
  }

  // No documents had the specified id.
  // Since upsert is set to true this means a new document was created.
  const upsertedId: string = modificationResult.upsertedId.toString();

  return await get(upsertedId)
}

async function exists(id: string): Promise<boolean> {
  const user = await get(id);

  if (!user) {
    return Promise.resolve(false);
  }

  return Promise.resolve(true);
}

async function _delete(id: string): Promise<void> {
  await User.deleteOne({_id: id});

  return Promise.resolve();
}

async function patch(id: string, patches: IPatchOperation[]): Promise<void> {
  const userDoc: nullable<IUserDocument> = await User.findOne({_id: id});

  if (!userDoc) {
    return Promise.reject(`Could not find a user with id ${id} when attempting patch a user!`)
  }

  const patchedDoc = jsonpatch.apply_patch(userDoc, patches)

  await patchedDoc.save();

  return Promise.resolve();
}

export default {
  get,
  getByEmail,
  getAll,
  addOne,
  updateOne,
  patch,
  delete: _delete,
  exists
} as const;
