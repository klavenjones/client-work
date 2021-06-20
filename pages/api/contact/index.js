//Protected API route
import { getSession } from 'next-auth/client'
import dbConnect from '../../../utils/dbConnect'

import Contact from '../../../models/Contacts'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const contact = await Contact.find({}) /*  Get all Contacts  */
        res.status(200).json({ success: true, data: contact })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const contact = await Contact.create(req.body) /*  Create   */
        res.status(201).json({ success: true, data: contact })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
