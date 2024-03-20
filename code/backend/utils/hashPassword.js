// Bcrypt Import
import bcrypt from "bcryptjs";

// Method to Hash Password
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Method to Compare Password
export const comparePassword = async (candidatePassword, hashedPassword) => {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};
