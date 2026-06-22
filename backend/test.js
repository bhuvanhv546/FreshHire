require('dotenv').config();

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

console.log("URI Loaded:", uri);

async function test() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("CONNECTED SUCCESSFULLY");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

test();