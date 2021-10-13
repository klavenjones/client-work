import Layout from "../components/layout";
import { useSession } from "next-auth/react";
import Redirect from "../components/redirect";

export default function Index() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (typeof window !== "undefined" && loading) return null;

  // If a session exists, let's push the user to the dashboard
  if (session) {
    return (
      <Layout>
        <Redirect url={"/dashboard"} />
      </Layout>
    );
  }

  return (
    <Layout>
    
    </Layout>
  );
}
