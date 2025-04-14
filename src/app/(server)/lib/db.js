import { Pool } from "pg";
import { CurrentDB } from "../../../../utils/envconfigs";

const dbConnection = new Pool({
  connectionString: CurrentDB,
});

// Check database connectivity on initialization without using `try`
dbConnection.on("connect", (client) => {
  console.log("Database connection established.");
});

dbConnection.on("error", (err, client) => {
  console.error("Database connection error:", err);
  // Log the error or notify the system about connectivity issues
});

export default dbConnection;
