import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

//This form will be used to Edit and Add a new Contact to the database
export const ContactForm = ({ formId, contactForm, newContact = true }) => {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  //Initial Data for form
  const [form, setForm] = useState({
    name: contactForm.name,
    title: contactForm.title,
    company: contactForm.company,
    email: contactForm.email,
    phone: contactForm.phone,
    twitter: contactForm.twitter,
    linkedin: contactForm.linkedin,
    note: contactForm.note
  });

  //PUT or edit Contact
  const editContact = async (form) => {
    const { id } = router.query;
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "PUT",
        headers: {
          Accept: contentType,
          "Content-Type": contentType
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        throw new Error(res.status);
      }
      const { data } = await res.json();
      mutate(`/api/contact/${id}`, data, false);
      router.push("/");
    } catch (error) {
      setMessage("Failed to update Contact");
    }
  };

  const addContact = async (form) => {
    try {
      const res = await fetch(`/api/contact`, {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push("/dashboard");
    } catch (error) {
      setMessage("Failed to add Contact");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      newContact ? addContact(form) : editContact(form);
    } else {
      setErrors({ errs });
    }
  };

  const formValidate = () => {
    const err = {};
    if (!form.name) err.name = "Name is Required";
    if (!form.email) err.email = "Email is Required";
    return err;
  };

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          value={form.name}
          id="name"
          type="text"
          name="name"
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          value={form.email}
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">Phone Number</label>
        <input
          value={form.phone}
          type="text"
          name="phone"
          id="phone"
          onChange={handleChange}
        />

        <label htmlFor="twitter">Twitter</label>
        <input
          value={form.twitter}
          type="text"
          name="twitter"
          id="twitter"
          onChange={handleChange}
        />

        <label htmlFor="linkedin">Linkedin</label>
        <input
          value={form.linkedin}
          type="text"
          name="linkedin"
          id="linkedin"
          onChange={handleChange}
        />

        <label htmlFor="Note">Note</label>
        <textarea
          value={form.note}
          name="note"
          id="note"
          onChange={handleChange}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  );
};
