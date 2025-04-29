import axiosInstance from "../../../../utils/axios";
import { apiLinks } from "../Urls";

export const apiUContact = async (data) => {
  const response = await axiosInstance.post(
    apiLinks.user.contact.post,
    JSON.stringify({
      fullname: data.fullname,
      company: data.cname,
      email: data.email,
      mobile: data.phone,
      country: data.location,
      services: data.services,
      details: data.details,
    }),

    {
      headers: {
        "Content-Type": "application/JSON",
      },
    }
  );
  return response;
};
