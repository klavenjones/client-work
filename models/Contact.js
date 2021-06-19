import mongoose from 'mongoose'

//This Schema will correspond with the collection in our db
const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: [20]
  },
  company: {
    type: String,
    maxlength: [100]
  },
  title: {
    type: String,
    maxlength: [80]
  },
  email: {
    type: String,
    required: true
  }
})

export default mongoose.models.Contact ||
  mongoose.model('Contact', ContactSchema)
