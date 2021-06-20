import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

const ContactForm = ({ formId, contactForm, newContact = true }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    name: contactForm.name,
    title: contactForm.title,
    company: contactForm.company,
    email: contactForm.email,
    phone: contactForm.phone,
    twitter: contactForm.twitter,
    linkedin: contactForm.linkedin,
    note: contactForm.note
  })

  
}
