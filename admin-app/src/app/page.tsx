"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    router.push(
      Object.keys(user).length ? `/home/my-${user.ownType}` : "/auth/register"
    );
  }, [router]);
  return <></>;
}
