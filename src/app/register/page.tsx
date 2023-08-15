"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import LoadingDots from "@/components/loading-dots/component";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Register() {
   const { data: session, status } = useSession();
   const [loading, setLoading] = useState(false);
   const router = useRouter();

   return (
      <>
         <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
               <Image
                  className="mx-auto h-10 w-auto invert"
                  width={400}
                  height={400}
                  src="/next.svg"
                  alt="Your Company"
               />
               <h2 className="mt-10 text-white text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Registrate
               </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
               <form
                  onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                     e.preventDefault();

                     setLoading(true);

                     const formData = new FormData(e.currentTarget);

                     const response = await fetch("/api/registrar", {
                        method: "POST",
                        headers: {
                           "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                           username: formData.get("username"),
                           email: formData.get("email"),
                           password: formData.get("password"),
                        }),
                     });

                     const result = await response.json();

                     console.log(result);

                     if (result.usuarioExiste) {
                        toast.error(
                           "El usuario ya existe, por favor ingresa otro"
                        );
                        setTimeout(() => {
                           setLoading(false);
                        }, 2000);
                     } else if (result.emailExiste) {
                        toast.error(
                           "El e-mail ya existe por favor ingresa otro"
                        );
                        setTimeout(() => {
                           setLoading(false);
                        }, 2000);
                     } else {
                        toast.success(
                           "Usuario creado exitosamente... Redirigiendo..."
                        );
                        setTimeout(() => {
                           router.push("/login");
                        }, 2000);
                     }
                  }}
                  className="space-y-6"
                  action=""
                  method=""
               >
                  <Toaster />
                  <div>
                     <label
                        htmlFor="email"
                        className="block text-white text-sm font-medium leading-6"
                     >
                        Username
                     </label>
                     <div className="mt-2">
                        <input
                           id="username"
                           name="username"
                           type="text"
                           autoComplete=""
                           required
                           className="block outline-none h-10 w-full bg-indigo-950 px-4 rounded-md border-0 py-1.5 text-gray-300 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                     </div>
                  </div>

                  <div>
                     <label
                        htmlFor="email"
                        className="block text-white text-sm font-medium leading-6"
                     >
                        Email address
                     </label>
                     <div className="mt-2">
                        <input
                           id="email"
                           name="email"
                           type="email"
                           autoComplete="email"
                           required
                           className="block outline-none h-10 w-full bg-indigo-950 px-4 rounded-md border-0 py-1.5 text-gray-300 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                     </div>
                  </div>

                  <div>
                     <div className="flex items-center justify-between">
                        <label
                           htmlFor="password"
                           className="block text-white text-sm font-medium leading-6"
                        >
                           Password
                        </label>
                     </div>
                     <div className="mt-2">
                        <input
                           id="password"
                           name="password"
                           type="password"
                           autoComplete=""
                           required
                           className="block h-10 w-full text-white px-4 bg-indigo-950 rounded-md border-0 outline-none py-1.5 text-gray-900 shadow-sm  placeholder:text-white"
                        />
                     </div>
                  </div>

                  <div>
                     <button
                        type="submit"
                        className="flex mt-10 h-10 items-center w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                     >
                        {loading ? (
                           <LoadingDots color="#808080" />
                        ) : (
                           <p>Registrarse</p>
                        )}
                     </button>
                  </div>
               </form>

               <div className="mt-10 gap-3 flex items-center justify-center">
                  <hr className="w-full border-gray-700" />
                  <p>or</p>
                  <hr className="w-full border-gray-700" />
               </div>

               <div className="mt-10">
                  <button
                     onClick={() => {}}
                     className="flex w-full h-12 items-center justify-center rounded-md bg-gray-800 px-3 py-1.5 text-white text-sm font-semibold leading-6 shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                     <Image
                        className="w-7"
                        width={400}
                        height={400}
                        src="/google.png"
                        alt="logo google"
                     />
                     <p className="ml-3">Sign in with Google</p>
                  </button>
               </div>

               <p className="mt-16 text-center text-sm text-gray-400">
                  Not a member?
                  <a
                     href="#"
                     className="font-semibold ml-2 leading-6 text-indigo-400 hover:text-indigo-300"
                  >
                     Start a 14 day free trial
                  </a>
               </p>
            </div>
         </div>
      </>
   );
}
