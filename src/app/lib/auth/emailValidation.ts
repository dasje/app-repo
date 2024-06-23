export function emailValidation(email: string) {
  if (email.length === 0) {
    return false;
  }
  return true;
}
