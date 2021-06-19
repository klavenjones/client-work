import mongoose from 'mongoose'

//Retrieve URI from MongoDB database
const MONGODB_URI = process.env.MONGODB_URI

//If the URI does not exist throw an error.
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local or your environment variables.'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

//Connect to our database
async function dbConnection() {
  //If there is a cached connection return it
  if (cached.conn) {
    return cached.conn
  }
  //If there is no promise within our cache we will then make another request with mongoose, save it in the cache and return our cached connection.
  if (!cached.promise) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: false,
      useCreateIndex: true
    }

    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
      return mongoose
    })
  }
  //else we return our connection
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnection
