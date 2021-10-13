import Link from "next/link";
import { useSession } from "next-auth/react";
import Layout from "../../components/layout";
import Redirect from "../../components/redirect.js";
import dbConnection from "../../util/dbConnection";
import Contact from "../../models/Contacts";

export default function Dashboard({ contacts }) {
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
      <h1>Contacts</h1>
      <Link href="/dashboard/contacts/new">
        <a>Add Contact</a>
      </Link>
      {contacts.map((contact) => (
        <Link
          key={contact._id}
          href="dashboard/contacts/[id]/"
          as={`dashboard/contacts/${contact._id}/`}
        >
          <a>{contact.name}</a>
        </Link>
      ))}
    </Layout>
  );
}

export async function getServerSideProps() {
  await dbConnection();

  //Find All Contacts
  const result = await Contact.find({});
  const contacts = result.map((doc) => {
    const contact = doc.toObject();
    contact._id = contact._id.toString();
    contact.userId = contact.userId.toString();
    return contact;
  });
  return { props: { contacts: contacts } };
}
