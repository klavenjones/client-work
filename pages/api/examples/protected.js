// This is an example of to protect an API route
import { getSession } from 'next-auth/client'

import dbConnect from '../../../util/dbConnection'

export default async (req, res) => {
  const session = await getSession({ req })

  await dbConnect()

  


  if (session) {
    res.send({
      content:
        'This is protected content. You can access this content because you are signed in.'
    })
  } else {
    res.send({
      error: 'You must be sign in to view the protected content on this page.'
    })
  }
}
