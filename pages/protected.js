import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Layout from "../components/layout";
import AccessDenied from "../components/access-denied";
import dbConnection from "../util/dbConnection";
import Contacts from "../models/Contacts";

export default function Protected({ contacts }) {
  const { data: session, status } = useSession();
  const loading = status === "loading";
 
 

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, render the access denied component which will redirect them back to the homepage
  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  // If session exists, display content
  return (
    <Layout>
      <h1>Contacts</h1>
      {contacts.map((contact) => (
        <p key={contact._id}> contact.name</p>
      ))}
    </Layout>
  );
}

export async function getServerSideProps() {
  await dbConnection();

  //Find All Contacts
  const result = await Contacts.find({});
  const contacts = result.map((doc) => {
    const contact = doc.toObject();
    contact._id = contact._id.toString();
    contact.userId = contact.userId.toString();
    return contact;
  });
  return { props: { contacts: contacts } };
}
