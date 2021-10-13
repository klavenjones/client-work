import mongoose from "mongoose";
const Schema = mongoose.Schema;
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
  },
  phone: {
    type: String,
    maxlength: [30]
  },
  twitter: {
    type: String,
    maxlength: [80]
  },
  linkedin: {
    type: String,
    maxlength: [80]
  },
  note: {
    type: String,
    maxlength: [300]
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

export default mongoose.models.Contact ||
  mongoose.model("Contact", ContactSchema);
