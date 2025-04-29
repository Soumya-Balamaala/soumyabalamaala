import axiosInstance from "../../../../utils/axios";
import { apiLinks } from "../Urls";

export const getCountries = async () => {
  const response = await axiosInstance.get(apiLinks.global.countries.get, {
    headers: {
      "Content-Type": "application/JSON",
    },
  });
  return response;
};
