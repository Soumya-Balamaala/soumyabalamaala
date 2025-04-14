import axiosInstance from "../../../utils/axios";
import { User } from "./Urls";



export const apiUContact = async (data) => {
  const response = await axiosInstance.post(
    User.Contact.post,
    JSON.stringify({
      fullname: data.fullname,
      email: data.email,
      cname: data.cname,
      phone: data.phone,
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
