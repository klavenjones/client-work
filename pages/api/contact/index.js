//Protected API route
import { getSession } from "next-auth/react";
import dbConnection from "../../../util/dbConnection";

import Contact from "../../../models/Contacts";
import User from "../../../models/Users";

export default async function handler(req, res) {
  const { method } = req;
  const session = await getSession({ req });
  const { email } = session.user;
  console.log(email);
  if (session) {
    await dbConnection();

    const user = await User.findOne({
      email
    });

    console.log(user);

    switch (method) {
      case "GET":
        try {
          const contact = await Contact.find({}); /*  Get all Contacts  */
          res.status(200).json({ success: true, data: contact });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      case "POST":
        try {
          const contact = await Contact.create({
            userId: user._id,
            ...req.body
          });
          /*  Create   */
          res.status(201).json({ success: true, data: contact });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      default:
        res.status(400).json({ success: false });
        break;
    }
  }
}
