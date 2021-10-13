import { useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

export default function Redirect({ url }) {
  const router = useRouter();

  useEffect(() => {
    router.push(url);
  }, []);

  return null;
}
