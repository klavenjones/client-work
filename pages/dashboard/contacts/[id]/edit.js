import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Layout from "../../../../components/layout";
import Redirect from "../../../../components/redirect.js";
import { ContactForm } from "../../../../components/Forms/contact-form";
import useSWR from "swr";

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

export default function EditContactPage({ contacts }) {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const { data: contact, error } = useSWR(
    id ? `/api/contact/${id}` : null,
    fetcher
  );
  console.log(error);
  if (error) return <h1>Failed to Load</h1>;
  if (!contact) return <h1>Loading.....</h1>;

  const contactForm = {
    name: contact.name,
    title: contact.title,
    company: contact.company,
    email: contact.email,
    phone: contact.phone,
    twitter: contact.twitter,
    linkedin: contact.linkedin,
    note: contact.note
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
      <h1>Edit Contact</h1>
      <ContactForm
        formId={"add-contact-form"}
        contactForm={contactForm}
        newContact={false}
      />
    </Layout>
  );
}
