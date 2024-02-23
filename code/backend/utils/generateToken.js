// Generate Token

import jwt from "jsonwebtoken";

const generateToken = (res, userId, role, areContactDetailsComplete, areBusinessDetailsComplete, isFormComplete) => {
  const token = jwt.sign({ userId, role, areContactDetailsComplete, areBusinessDetailsComplete, isFormComplete }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
