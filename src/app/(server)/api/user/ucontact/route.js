import { globaljsonResponse } from "@/app/(server)/lib/globaljsonResponse";
import { StatusCodes } from "@/app/(server)/lib/StatusCodes";
import { UserContact } from "@/app/(server)/lib/Queries/UserQueries";
import dbConnection from "@/app/(server)/lib/db";
import { userEnquiryResponse } from "@/app/(server)/lib/emails/Thankyouemail";
import { contactTrackingID } from "@/app/(server)/lib/TrackingIds";
import { globalQueries } from "@/app/(server)/lib/Queries/GlobalQueries";

// ------------------ POST Handler ------------------
export async function POST(request) {
  const baseError = "Something went wrong. Please try again later.";

  return request
    .json()
    .then((body) => {
      const { fullname, company, email, mobile, country, services, details } =
        body;
      const estatus = "raised";

      if (!fullname || !company || !email || !mobile || !country || !services) {
        return globaljsonResponse.error(
          "All fields are required",
          StatusCodes.BAD_REQUEST_400
        );
      }

      // Check if user already exists
      return dbConnection
        .query(UserContact.exist, [email])
        .then((existResult) => {
          if (existResult.rowCount > 0) {
            return globaljsonResponse.success(
              "The Data Already Exists",
              StatusCodes.OK_200
            );
          }

          // If not exist, get the total count
          return dbConnection
            .query(UserContact.getcount)
            .then((countResult) => {
              // console.log(countResult.rows[0].count);
              const totalCount = countResult.rows[0].count;
              const trackingId = contactTrackingID(totalCount);

              // Insert new user
              return dbConnection
                .query(UserContact.post, [
                  trackingId,
                  fullname,
                  company,
                  email,
                  mobile,
                  country,
                  services,
                  details,
                  estatus,
                ])
                .then((insertResult) => {
                  if (insertResult.rowCount !== 1) {
                    throw new Error("Failed to insert the new user.");
                  }

                  console.log("Inserted User:", insertResult.rows[0]);
                  const user = insertResult.rows[0];
                  return userEnquiryResponse(user).then(() => {
                    return globaljsonResponse.success(
                      "We have received your information. Our team will reach out to you within 24 business hours.",
                      StatusCodes.OK_200
                    );
                  });

                  // Fetch logos
                });
            });
        });
    })
    .catch((error) => {
      console.error("Error occurred in POST /contact:", error);
      return globaljsonResponse.error(
        baseError,
        StatusCodes.INTERNAL_SERVER_ERROR_500
      );
    });
}
