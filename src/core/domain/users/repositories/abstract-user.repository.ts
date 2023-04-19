import { UserModel } from '../models';

export abstract class AbstractUserRepository {
  abstract setContext(context: unknown): void;
  abstract createUser(email: string, hashPassword: string): Promise<UserModel>;
  abstract getUserById(id: string): Promise<UserModel | null>;
  abstract getUserByEmail(email: string): Promise<UserModel | null>;
  abstract getUserByIdWithVerificationCode(
    id: string,
    verificationCode: string,
    passwordRecoveryCode: boolean,
  ): Promise<UserModel | null>;
  abstract getUserByEmailWithVerificationCode(
    email: string,
    verificationCode: string,
    passwordRecoveryCode: boolean,
  ): Promise<UserModel | null>;
  abstract updateUserById(
    id: string,
    data: Partial<UserModel>,
  ): Promise<UserModel>;
  abstract updateUserByEmail(
    email: string,
    data: Partial<UserModel>,
  ): Promise<UserModel>;
  abstract deleteUserById(id: string): Promise<UserModel>;
}
