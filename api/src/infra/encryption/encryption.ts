import crypto from "crypto";

const salt = "cb8ce10e58955266ba45f3a545b44599";
export const hash = (password: string): string => {
  return crypto.pbkdf2Sync(password,
    salt, 1000, 10, "sha512").toString("hex");
};

export const compare = (password: string, hashedPassword: string): boolean => {
  const derivedKeyToCompare = hash(password);
  return hashedPassword === derivedKeyToCompare;
};
