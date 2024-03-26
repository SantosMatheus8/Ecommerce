import bcrypt from "bcrypt";

export const hash = (password: string): string => {
  return bcrypt.hashSync(password, 10);
};

export const compare = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};
