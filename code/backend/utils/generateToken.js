// JWT Import
import jwt from "jsonwebtoken";

// Generating Token
const generateToken = (
  res,
  userId,
  role,
  areContactDetailsComplete,
  areBusinessDetailsComplete,
  isFormComplete,
  status
) => {
  const token = jwt.sign(
    {
      userId,
      role,
      areContactDetailsComplete,
      areBusinessDetailsComplete,
      isFormComplete,
      status,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
