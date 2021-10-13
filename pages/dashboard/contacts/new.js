import { useSession } from "next-auth/react";
import Layout from "../../../components/layout";
import Redirect from "../../../components/redirect.js";
import { ContactForm } from "../../../components/Forms/contact-form";

export default function AddContactPage({ contacts }) {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const contactForm = {
    name: "",
    title: "",
    company: "",
    email: "",
    phone: "",
    twitter: "",
    linkedin: "",
    note: ""
  };

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, render the access denied component which will redirect them back to the homepage
  if (!session) {
    return (
      <Layout>
        <Redirect url={"/"} />
      </Layout>
    );
  }

  // If session exists, display content
  return (
    <Layout>
      <h1>Add Contact</h1>
      <ContactForm
        formId={"add-contact-form"}
        contactForm={contactForm}
        newContact
      />
    </Layout>
  );
}
