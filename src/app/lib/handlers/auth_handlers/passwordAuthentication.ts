import bcrypt from "bcryptjs";

export function encryptPassword(password: string) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  return hash;
}

export function verifyPassword(hash: string, password: string) {
  return bcrypt.compareSync(password, hash);
}
