export const UserContact = {
  post: `
    INSERT INTO contact (
      name,
      company,
      email,
      mobile,
      services,
      details
    ) VALUES (
      $1, $2, $3, $4, $5, $6
    );
  `,
  exist: `SELECT 1 FROM contact WHERE email = $1 AND mobile = $2 LIMIT 1`,
};
