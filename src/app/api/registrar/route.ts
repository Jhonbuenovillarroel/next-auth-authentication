import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
   const body = await request.json();

   const { username, email, password } = body;

   const userExists = await prisma.user.findUnique({
      where: {
         name: username,
      },
   });

   const emailExists = await prisma.user.findUnique({
      where: {
         email: email,
      },
   });

   if (userExists) {
      return NextResponse.json({
         user: { name: userExists.name, email: userExists.email },
         existe: true,
         usuarioExiste: true,
         emailExiste: undefined,
      });
   } else if (emailExists) {
      return NextResponse.json({
         user: { name: emailExists.name, email: emailExists.email },
         existe: true,
         usuarioExiste: undefined,
         emailExiste: true,
      });
   } else if (!userExists && !emailExists) {
      const newUser = await prisma.user.create({
         data: {
            name: username,
            email: email,
            password: await bcrypt.hash(password, 12),
         },
      });

      return NextResponse.json({
         user: { name: newUser.name, email: newUser.email },
         existe: false,
      });
   }
}
