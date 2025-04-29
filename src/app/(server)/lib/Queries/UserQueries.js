export const UserContact = {
  post: `
    INSERT INTO enquires (
      enquiryid,
      fullname,
      company,
      email,
      mobile,
      country,
      services,
      details,
      status
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9
    )
    RETURNING *;
  `,
  exist: `SELECT 1 FROM enquires WHERE email = $1 LIMIT 1`,
  getcount:`SELECT COUNT(*) FROM enquires;
`
};
