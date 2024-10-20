import { MongoClient, Db } from 'mongodb';
import { Node } from './types';

let client: MongoClient;
let db: Db;

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in the environment variables');
  }

  client = new MongoClient(uri);
  await client.connect();
  db = client.db();
  console.log('Connected to MongoDB');
}

export async function saveRule(name: string, rule: Node) {
  await db.collection('rules').insertOne({ name, rule });
}

export async function getRule(name: string) {
  return await db.collection('rules').findOne({ name });
}

export async function updateRule(name: string, rule: Node) {
  await db.collection('rules').updateOne({ name }, { $set: { rule } });
}

export async function deleteRule(name: string) {
  await db.collection('rules').deleteOne({ name });
}

export async function getAllRules() {
  const rulesCollection = db.collection('rules'); 
  return await rulesCollection.find({}).toArray(); 
}
