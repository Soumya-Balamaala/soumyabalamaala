import axiosInstance from "../../../../utils/axios";
import { BASE_URL, CurrentAPIUrl } from "../../../../utils/envconfigs";
import { apiLinks } from "../Urls";

export const getCountries = async () => {
  const response = await axiosInstance.get(apiLinks.global.countries.get, {
    headers: {
      "Content-Type": "application/JSON",
      "Access-Control-Allow-Origin": "*",
    },
  });
  return response;
};
