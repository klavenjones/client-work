import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Layout from "../../../../components/layout";
import Redirect from "../../../../components/redirect.js";
import Contact from "../../../../models/Contacts";
import Link from "next/link";

import dbConnection from "../../../../util/dbConnection";

const ContactPage = ({ contact }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const handleDelete = async () => {
    const contactId = router.query.id;
    try {
      await fetch(`/api/contact/${contactId}`, {
        method: "Delete"
      });
      router.push("/dashboard");
    } catch (error) {
      setMessage("Failed to delete user");
    }
  };

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, render the redirect component which will redirect them back to the homepage
  if (!session) {
    return (
      <Layout>
        <Redirect url={"/"} />
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>{contact.name}</h1>
      <p>{contact.email}</p>
      <p>{contact?.phone}</p>
      <p>{contact?.linkedin}</p>
      <p>{contact?.twitter}</p>
      <Link href={`${contact._id}/edit`}>
        <a>Edit User</a>
      </Link>
      <button onClick={handleDelete}>Delete User</button>
      <p>{message}</p>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnection();
  const contact = await Contact.findById(params.id).lean();
  contact._id = contact._id.toString();
  contact.userId = contact.userId.toString();
  return { props: { contact } };
}

export default ContactPage;
