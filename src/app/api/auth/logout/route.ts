import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = new NextResponse(
      JSON.stringify({
        status: "success",
        headers: { "Content-Type": "application/json" },
      })
    );

    await Promise.all([
      response.cookies.set({
        name: "token",
        value: "",
        maxAge: -1,
      }),
      response.cookies.set({
        name: "logded-in", // Fix the typo in "logded-in" to "logged-in"
        value: "",
        maxAge: -1,
      }),
    ]);

    return response;
  } catch (error) {
    console.error("Error in GET request:", error);
    // Handle the error as needed
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
