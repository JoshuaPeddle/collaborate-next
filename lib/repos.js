import { clientPromise, dbName } from './mongodb';
import { ObjectId } from 'mongodb';

export async function getRepoData() {
  const client = await clientPromise;
  const db = client.db(dbName);
  const repositories = await db.collection('repositories').find({}).toArray();
  // Need to convert _id to a string to be able to use it in the URL
  repositories.forEach((repo) => {
    repo._id = repo._id.toString();
  });

  console.log('here', repositories);
  return repositories;
}
  