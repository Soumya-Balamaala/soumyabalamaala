import { SoumyaEmaildetails } from "../../../../../utils/envconfigs";
import nodemailer from "nodemailer";

export const SoumyaTransporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true,
  auth: SoumyaEmaildetails,
});

export const SpectrumTransport = nodemailer.createTransport({
  host: "soumyabalamaala",
  port: 465,
  secure: true,
  auth: {
    user: "my_user",
    pass: "my_password",
  },
});
