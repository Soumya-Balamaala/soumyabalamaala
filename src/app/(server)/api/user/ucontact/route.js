import { globaljsonResponse } from "@/app/(server)/lib/globaljsonResponse";
import { StatusCodes } from "@/app/(server)/lib/StatusCodes";

// POST API handler
export async function POST(request) {
  const body = await request.json();
  const { name, email, username } = body;

  if (!name || !email || !username) {
    return globaljsonResponse.error(
      "All fields are required",
      StatusCodes.BAD_REQUEST_400
    );
  }

  return globaljsonResponse.success(
    "Your message has been received — we’ll get back to you soon!",
    StatusCodes.OK_200
  );
}
