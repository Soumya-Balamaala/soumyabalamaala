import { globaljsonResponse } from "@/app/(server)/lib/globaljsonResponse";
import { StatusCodes } from "@/app/(server)/lib/StatusCodes";
import { UserContact } from "@/app/(server)/lib/Queries/UserQueries";
import dbConnection from "@/app/(server)/lib/db";

import { sendContactEmail } from "@/app/(server)/lib/emails/Ethankyou";

// -----------------------------------------------------------  Emails

// -----------------------------------------------------------  Post

export async function POST(request) {
  const body = await request.json();
  const { fullname, cname, email, phone, services, details } = body;

  // Check for missing required fields
  if (!fullname || !cname || !email || !phone || !services) {
    return globaljsonResponse.error(
      "All fields are required",
      StatusCodes.BAD_REQUEST_400
    );
  }

  // Check if the data already exists
  return dbConnection
    .query(UserContact.exist, [email, phone])
    .then((result) => {
      if (result.rowCount > 0) {
        // If data exists, return a response
        return globaljsonResponse.success(
          "The Data is Already Exist",
          StatusCodes.OK_200
        );
      } else {
        // If data doesn't exist, insert the new data
        return dbConnection
          .query(UserContact.post, [
            fullname,
            cname,
            email,
            phone,
            services,
            details,
          ])
          .then((result) => {
            // Return resultponse after successful insertion

            const newrow = result.rowCount === 1;

            if (result.rowCount === 1) {
              const user = {
                fullname: fullname,
                cname: cname,
                email: email,
                phone: phone,
                services: services,
              };
              // sendContactEmail(user);
              return globaljsonResponse.success(
                "We have received your information. Our team will reach out to you within 24 business hours.",
                StatusCodes.OK_200
              );
            }
          })
          .catch((error) => {
            // Handle insertion error
            console.error("Error while inserting data:", error);
            return globaljsonResponse.error(
              "Something went wrong while inserting the data. Please try again later.",
              StatusCodes.INTERNAL_SERVER_ERROR_500
            );
          });
      }
    })
    .catch((error) => {
      // Handle query error (check if data exists)
      console.error("Database error:", error);
      return globaljsonResponse.error(
        "Something went wrong. Please try again later.",
        StatusCodes.INTERNAL_SERVER_ERROR_500
      );
    });
}
