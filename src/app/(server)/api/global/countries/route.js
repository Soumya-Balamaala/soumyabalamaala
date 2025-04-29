import dbConnection from "@/app/(server)/lib/db";
import { globaljsonResponse } from "@/app/(server)/lib/globaljsonResponse";
import { globalQueries } from "@/app/(server)/lib/Queries/GlobalQueries";
import { StatusCodes } from "@/app/(server)/lib/StatusCodes";

export function GET() {
  return dbConnection
    .query(globalQueries.countries.get)
    .then((result) => {
      const Countrieslist = result.rows;
      return globaljsonResponse.successwithdata(
        "Countries fetched Successfully.",
        StatusCodes.OK_200,
        "countries",
        Countrieslist
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
