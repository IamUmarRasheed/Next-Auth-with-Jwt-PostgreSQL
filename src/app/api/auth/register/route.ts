import { ZodError } from "zod";
import { getErrorResponse } from "@/lib/helpers";
import { users } from "@/lib/db/Schema/user.schema";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { db } from "@/lib/db/drizzle";
import {
  RegisterUserSchema,
  RegisterUserInput,
} from "@/lib/validations/uservalidation.schema";

export async function POST(request: NextRequest) {
  /* 1> first i user sent all the requred data
    2> then i check and validate the data through zod that i should have correct formit
    3> then i hashed the password before saving to db
    4> if everything is fine then save it in db else return error 
    5> then i return the respnse with user detail except password */
  try {
    const body = (await request.json()) as RegisterUserInput;
    const data = RegisterUserSchema.parse(body);
    const hashedPassword = await hash(data.password, 12);
    const user = await db
      .insert(users)
      .values({
        username: data.username,
        email: data.email,
        password: hashedPassword,
      })
      .returning();
    return new NextResponse(
      JSON.stringify({
        status: "success",
        data: { user: { ...user[0], password: undefined } },
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validation", error);
    }
    if (error.code === "23505") {
      return getErrorResponse(409, "user with that email already exists");
    }
    return getErrorResponse;
  }
}
