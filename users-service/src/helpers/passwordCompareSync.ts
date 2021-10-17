import bcryptjs from "bcryptjs";

export const helperPasswordCompare = (
  passwordToCompare: string,
  hashPassword: string
) => {
  return bcryptjs.compareSync(passwordToCompare, hashPassword);
};
