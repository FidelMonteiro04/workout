"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  return (
    <>
      {router.push(
        Object.keys(user).length ? `/home/my-${user.ownType}` : "/auth/register"
      )}
    </>
  );
}
