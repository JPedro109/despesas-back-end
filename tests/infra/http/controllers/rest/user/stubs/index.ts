/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  AbstractCreateUserUseCase,
  AbstractDeleteUserUseCase,
  AbstractRecoverUserPasswordUseCase,
  AbstractSendUserEmailUpdateLinkUseCase,
  AbstractSendUserPasswordRecoveryLinkUseCase,
  AbstractUpdateUserEmailUseCase,
  AbstractUpdateUserPasswordUseCase,
  AbstractUserLoginUseCase,
  AbstractUserVerifyEmailUseCase,
} from '@/core/domain/users/abstracts';
import {
  CreateUserDTO,
  CreateUserResponseDTO,
  DeleteUserDTO,
  DeleteUserResponseDTO,
  RecoverUserPasswordDTO,
  RecoverUserPasswordResponseDTO,
  SendUserEmailUpdateLinkDTO,
  SendUserEmailUpdateLinkResponseDTO,
  SendUserPasswordRecoveryLinkDTO,
  SendUserPasswordRecoveryLinkResponseDTO,
  UpdateUserEmailDTO,
  UpdateUserEmailResponseDTO,
  UpdateUserPasswordDTO,
  UpdateUserPasswordResponseDTO,
  UserLoginDTO,
  UserLoginResponseDTO,
  UserVerifyEmailDTO,
  UserVerifyEmailResponseDTO,
} from '@/core/domain/users/dtos';

export class CreateUserStub implements AbstractCreateUserUseCase {
  async execute({
    email,
    password,
    passwordConfirm,
  }: CreateUserDTO): Promise<CreateUserResponseDTO> {
    return email;
  }
}

export class DeleteUserStub implements AbstractDeleteUserUseCase {
  async execute({
    id,
    password,
    passwordConfirm,
  }: DeleteUserDTO): Promise<DeleteUserResponseDTO> {
    return id;
  }
}

export class RecoverUserPasswordStub
  implements AbstractRecoverUserPasswordUseCase
{
  async execute({
    email,
    code,
    password,
    passwordConfirm,
  }: RecoverUserPasswordDTO): Promise<RecoverUserPasswordResponseDTO> {
    return email;
  }
}

export class SendUserEmailUpdateLinkStub
  implements AbstractSendUserEmailUpdateLinkUseCase
{
  async execute({
    id,
    email,
  }: SendUserEmailUpdateLinkDTO): Promise<SendUserEmailUpdateLinkResponseDTO> {
    return id;
  }
}

export class SendUserPasswordRecoveryLinkStub
  implements AbstractSendUserPasswordRecoveryLinkUseCase
{
  async execute({
    email,
  }: SendUserPasswordRecoveryLinkDTO): Promise<SendUserPasswordRecoveryLinkResponseDTO> {
    return email;
  }
}

export class UpdateUserEmailStub implements AbstractUpdateUserEmailUseCase {
  async execute({
    id,
    email,
    code,
  }: UpdateUserEmailDTO): Promise<UpdateUserEmailResponseDTO> {
    return id;
  }
}

export class UpdateUserPasswordStub
  implements AbstractUpdateUserPasswordUseCase
{
  async execute({
    id,
    password,
    newPassword,
    newPasswordConfirm,
  }: UpdateUserPasswordDTO): Promise<UpdateUserPasswordResponseDTO> {
    return id;
  }
}

export class UserLoginStub implements AbstractUserLoginUseCase {
  async execute({
    email,
    password,
  }: UserLoginDTO): Promise<UserLoginResponseDTO> {
    return 'code';
  }
}

export class UserVerifyEmailStub implements AbstractUserVerifyEmailUseCase {
  async execute({
    email,
    code,
  }: UserVerifyEmailDTO): Promise<UserVerifyEmailResponseDTO> {
    return email;
  }
}
