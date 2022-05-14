const jwt = require("jsonwebtoken");

export const genAccessToken = (data: any) => {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};
