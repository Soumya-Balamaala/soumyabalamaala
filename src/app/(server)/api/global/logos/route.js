import dbConnection from "@/app/(server)/lib/db";
import { globaljsonResponse } from "@/app/(server)/lib/globaljsonResponse";
import { global } from "@/app/(server)/lib/Queries/GlobalQueries";
import { StatusCodes } from "@/app/(server)/lib/StatusCodes";

export function GET() {
  return dbConnection
    .query(global.logos.get)
    .then((result) => {
      const logoslist = result.rows;
      return globaljsonResponse.successwithdata(
        "logos fetched Successfully.",
        StatusCodes.OK_200,
        "logos",
        logoslist
      );
    })
    .catch((error) => {
      console.error("Error fetching countries:", error);
      return globaljsonResponse.error(
        "Countries Fetching Failed",
        StatusCodes.BAD_REQUEST_400,
        null
      );
    });
}
