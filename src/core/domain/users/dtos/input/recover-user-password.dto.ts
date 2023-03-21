export type RecoverUserPasswordDTO = {
  email: string;
  code: string;
  password: string;
  passwordConfirm: string;
};
