import {IUser, IUserDocument, User} from '../models/user.model'
import {IPatchOperation} from "../interfaces/patch.interface";

import jsonpatch from 'jsonpatch';
import {nullable} from "../types/nullable";

/**
 * Note: When there are no matches find() returns an empty array, while findOne() returns null.
 */


/**
 * Get one user by id (returns null if not found
 *
 * @param id
 */
async function get(id: string): Promise<nullable<IUserDocument>> {
  return User.findOne({_id: id})
}

/**
 * Get one user by email address (returns null if not found)
 *
 * @param email
 */
async function getByEmail(email: string): Promise<nullable<IUserDocument>> {
  return User.findOne({email: email})
}

/**
 * Get all users
 */
async function getAll(): Promise<IUserDocument[]> {
  return User.find({})
}

/**
 * See if a user with the given id exists
 *
 * @param id
 */
async function persists(id: string): Promise<boolean> {
  const result = await get(id)

  return result !== null;
}

async function add(userCreationParams: IUser, password: string): Promise<IUserDocument> {
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

async function modify(id: string, data: IUser): Promise<nullable<IUserDocument>> {
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

async function delete_(id: string): Promise<void> {
  await User.deleteOne({_id: id});
}

async function patch(id: string, patches: IPatchOperation[]): Promise<void> {
  const userDoc: nullable<IUserDocument> = await User.findOne({_id: id});

  if (!userDoc) {
    return Promise.reject(`Could not find a user with id ${id} when attempting patch a user!`)
  }

  const patchedDoc = jsonpatch.apply_patch(userDoc, patches)

  await patchedDoc.save();

  return;
}

// Export default

export default {
  get,
  getByEmail,
  getAll,
  add,
  modify,
  persists,
  patch,
  delete: delete_,
} as const;
