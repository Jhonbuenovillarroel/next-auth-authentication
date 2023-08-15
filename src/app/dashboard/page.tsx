"use client";

import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Dashboard() {
   const router = useRouter();

   return (
      <main className="p-8">
         <p className="">User is logged in</p>

         <Link
            className="flex mt-10 h-10 w-80 justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            href="/"
         >
            Go to Home
         </Link>

         <Link
            className="flex mt-10 h-10 w-80 justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            href="/dashboard/services"
         >
            Go to Services
         </Link>
      </main>
   );
}
