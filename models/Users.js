import mongoose from 'mongoose'

//This Schema will correspond with the collection in our db
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: [20]
    },
    email: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  { collection: 'users' }
)

export default mongoose.models.User ||
  mongoose.model('User', UserSchema, 'users')
