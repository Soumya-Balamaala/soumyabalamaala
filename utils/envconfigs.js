// Emails

export const SoumyaEmaildetails = {
  user: process.env.NEXT_GMAIL_ID,
  pass: process.env.NEXT_GMAIL_PSWD,
};

// Local Details

export const LocalDBLink = process.env.NEXT_LOCAL_DB_URL;

export const LocalBaseURL = "http://localhost:3000";

// Hosted Details

export const HostedDBLink = process.env.NEXT_HOSTED_DB_URL;

export const BASE_URL = "https://soumyabalamaala.vercel.app";

// DB Current Usage

export const CurrentDB = HostedDBLink;

// export const CurrentDB = LocalDBLink;

// URL Current Usage

export const CurrentAPIUrl = BASE_URL;

// export const CurrentAPIUrl = LocalBaseURL;
