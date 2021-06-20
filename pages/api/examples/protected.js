// This is an example of to protect an API route
import { getSession } from 'next-auth/client'
import User from '../../../models/Users'
import dbConnect from '../../../util/dbConnection'

export default async (req, res) => {
  const session = await getSession({ req })

  await dbConnect()

  if (session) {
    const users = await User.find({}) /* find all the data in our database */
    res.status(200).json({ success: true, data: users })
    // res.send({ content: 'Hello' })
  } else {
    res.send({
      error: 'You must be sign in to view the protected content on this page.'
    })
  }
  ;``
}
