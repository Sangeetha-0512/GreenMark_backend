const bcrypt = require("bcrypt");

// Number of salt rounds (higher is more secure but slower)
const SALT_ROUNDS = 10;

/**
 * Hash a plain text password.
 * @param {string} password - The plain text password to hash.
 * @returns {Promise<string>} - The hashed password.
 */
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Failed to hash password");
  }
};

/**
 * Compare a plain text password with a hashed password.
 * @param {string} password - The plain text password.
 * @param {string} hashedPassword - The hashed password.
 * @returns {Promise<boolean>} - True if the passwords match, false otherwise.
 */
const comparePasswords = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw new Error("Failed to compare passwords");
  }
};

// Export the utility functions
module.exports = {
  hashPassword,
  comparePasswords,
};
