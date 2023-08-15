"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Auth({ children }: { children: React.ReactNode }) {
   const router = useRouter();

   const { status } = useSession({
      required: true,
      onUnauthenticated() {
         router.push("/login");
      },
   });

   if (status === "loading") {
      return <p>Loading...</p>;
   }

   return children;
}
