export const LocalDBLink = process.env.NEXT_LOCAL_DB_URL;

export const HostedDBLink = process.env.NEXT_HOSTED_DB_URL;

// Current Database

export const CurrentDB = HostedDBLink;

// export const CurrentDB = LocalDBLink;

//

export const BASE_URL = process.env.NEXT_DOMAIN_URL || "http://localhost:3000";

export const ThankyouEmail = process.env.NEXT_THANK_YOU_API_KEY;
