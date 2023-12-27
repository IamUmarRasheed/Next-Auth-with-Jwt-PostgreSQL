import { ZodError } from "zod";
import { NextResponse } from "next/server";
// the function is used when error occur in the api 
export function getErrorResponse(
  status: number = 500,
  message: string,
  errors: ZodError | null = null
) {
  return new NextResponse(
    JSON.stringify({
      status: status < 500 ? "fail" : "error",
      message,
      errors: errors ? errors.flatten() : null,
    }),
    {
      status: status,
      headers: { "Content-Type": "application/json" },
    }
  );
}


//the function used to get env verable 
type EnvVariableKey = "JWT_SECRET_KEY" | "JWT_EXPIRES_IN";
export function getEnvVariable(key: EnvVariableKey): string {
  const value = process.env[key];
  if (!value || value?.length == 0) {
    console.log(`${key} is not defined`);
    throw new Error(`${key} is not defined`);
  }
  return value;
}
