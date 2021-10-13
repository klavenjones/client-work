import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Layout from "../../components/layout";
import Redirect from "../../components/redirect";

export default function Page() {
  const { data: session, status } = useSession();
  const [content, setContent] = useState();
  const loading = status === "loading";

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/examples/protected");
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      }
    };
    fetchData();
  }, [session]);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, redirect user to the login screen
  if (!session) {
    return <Redirect />;
  }

  // If session exists, display content
  return (
    <Layout>
      <h1>Protected Page</h1>
      <p>
        <strong>{content || "\u00a0"}</strong>
      </p>
    </Layout>
  );
}
