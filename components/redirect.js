import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/client'

export default function Redirect() {
  const router = useRouter()

  useEffect(() => {
    router.push('/')
  }, [])

  return null
}
