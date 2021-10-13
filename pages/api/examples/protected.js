// This is an example of to protect an API route
import { getSession } from 'next-auth/react'
import User from '../../../models/Users'
import dbConnect from '../../../util/dbConnection'

export default async (req, res) => {
  //Connect to Database
  await dbConnect()
  //Retrieve Current Session
  const session = await getSession({ req })
  //Retrieve Session Email
  const { email } = session.user

  if (session) {
    const user = await User.findOne({
      email
    }) /* find all the data in our database */

    res.status(200).json({ success: true, data: user })
  } else {
    res.send({
      error: 'You must be sign in to view the protected content on this page.'
    })
  }
}
