export function passwordValidation(password: string) {
  const expression: RegExp =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
  return expression.test(password);
}
