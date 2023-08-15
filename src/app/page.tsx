"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
   const { data: session, status } = useSession();

   // async function fetchPrueba() {
   //    const response = await fetch("/api/prueba", {
   //       method: "POST",
   //       headers: {
   //          "Content-Type": "application/json",
   //       },
   //       body: JSON.stringify({ greeting: "Hello World" }),
   //    });

   //    const result = await response.json();

   //    console.log(result);
   // }

   if (status === "authenticated") {
      return (
         <main className="p-8">
            <p>Signed in as {session.user?.email}</p>
            <Link
               onClick={() => signOut()}
               className="flex mt-10 h-10 w-80 justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
               href="#"
            >
               Cerrar Sesión
            </Link>
            <Link
               className="flex mt-10 h-10 w-80 justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
               href="/dashboard"
            >
               Ir al panel de administración
            </Link>

            {/* <button
               onClick={() => {
                  fetchPrueba();
               }}
               className="mt-8 p-2"
            >
               Fetch Prueba
            </button> */}
            <Link
               className="flex mt-10 h-10 w-80 justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
               href="/login"
            >
               Iniciar Sesión
            </Link>
         </main>
      );
   }

   return (
      <main className="p-8">
         <Toaster />
         <Link
            className="flex mt-10 h-10 w-80 justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            href="/login"
         >
            Iniciar Sesión
         </Link>
         <Link
            className="flex mt-10 h-10 w-80 justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            href="/register"
         >
            Registrate
         </Link>
         <Link
            className="flex mt-10 h-10 w-80 justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            href="/dashboard"
         >
            Ir al panel de Administración
         </Link>

         {/* <button
            className="flex mt-10 h-10 w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => {
               toast.success("Exito");
            }}
         >
            Click
         </button> */}
      </main>
   );
}
