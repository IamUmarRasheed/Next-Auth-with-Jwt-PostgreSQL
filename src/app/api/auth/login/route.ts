import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";
import { ZodError } from "zod";
import { db } from "@/lib/db/drizzle";
import { getToken } from "@/lib/token";
import { User, users } from "@/lib/db/Schema/user.schema";
import { NextRequest, NextResponse } from "next/server";
import { getEnvVariable, getErrorResponse } from "@/lib/helpers";
import {
  loginUserSInput,
  loginUserSchema,
} from "@/lib/validations/uservalidation.schema";
import { use } from "react";

export async function POST(request: NextRequest) {
  /* 1 > i get the data like user  email and password
    2 > i check the user enter the data or 
    3 > check the user is register through find in database by therir emial 
    4 > if user are register then i check that user have password which is correct or not 
    5> then i generate the jwt token 
    6> then i send the token to client side by cookie or body
    */
  try {
    const body = (await request.json()) as loginUserSInput;
    const data = loginUserSchema.parse(body);

    const user = await db
      .select({
        id: users.id,
        password: users.password,
      })
      .from(users)
      .where(eq(users.email, data.email));
    if (!user[0] || !(await compare(data.password, user[0].password))) {
      return getErrorResponse(404, "Invalid email or password");
    }
    // getEnvVarible is function in helper.ts which return only env varible value
    const Jwt_expires_in = getEnvVariable("JWT_EXPIRES_IN");
    // the gettoken is function in lib dir which have code to genrate token
    const token = await getToken(
      { sub: `${user[0].id}` },
      { exp: `${Jwt_expires_in}m` }
    );
    const response = new NextResponse(
      JSON.stringify({
        status: "success",
        token: token,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
    /* the cookies option set and the logded in cookies set  */
    const tokenMaxAge = parseInt(Jwt_expires_in) * 60;
    const cookieOption = {
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: tokenMaxAge,
    };
    await Promise.all([
      // Set the "token" cookie to send the JWT token to the client.
      // This cookie is commonly used for authentication purposes.
      response.cookies.set(cookieOption),
      // Set the "logged-in" cookie to indicate that the user is logged in.
      // This cookie is used to track the user's login state on the client side.
      response.cookies.set({
        name: "logged-in",
        value: "true",
        maxAge: tokenMaxAge, // Set the maximum age of the "logged-in" cookie.
      }),
    ]);
    return response;
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error);
    }
    return getErrorResponse(500, error.message);
  }
}
