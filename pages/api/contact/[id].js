import Contact from "../../../models/Contacts";
import dbConnection from "../../../util/dbConnection";

export default async function handler(req, res) {
  const {
    query: { id },
    method
  } = req;

  await dbConnection();

  switch (method) {
    case "GET" /* Get a model by its ID */:
      try {
        const contact = await Contact.findById(id);
        if (!contact) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: contact });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" /* Edit a model by its ID */:
      try {
        const contact = await Contact.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        console.log(contact);
        if (!contact) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: contact });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" /* Delete a model by its ID */:
      try {
        const deletedPet = await Contact.deleteOne({ _id: id });
        if (!deletedPet) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
