export function passwordValidation(password: string) {
  const expression: RegExp =
    /(?=.*\d.*)(?=.*[a-zA-Z].*)(?=.*[!#\$%&\?].*).{8,}/;
  return expression.test(password);
}
