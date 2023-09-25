import { Module } from '@nestjs/common';
import {
  CryptographyModule,
  DatabaseModule,
  MailModule,
  GenerationModule,
  AuthenticationModule,
} from '@/infra';
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
} from './abstracts';
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  RecoverUserPasswordUseCase,
  SendUserEmailUpdateLinkUseCase,
  SendUserPasswordRecoveryLinkUseCase,
  UpdateUserEmailUseCase,
  UpdateUserPasswordUseCase,
  UserLoginUseCase,
  UserVerifyEmailUseCase,
} from './use-cases';

@Module({
  imports: [
    CryptographyModule,
    DatabaseModule,
    MailModule,
    GenerationModule,
    AuthenticationModule,
  ],
  providers: [
    {
      provide: AbstractCreateUserUseCase,
      useClass: CreateUserUseCase,
    },
    {
      provide: AbstractDeleteUserUseCase,
      useClass: DeleteUserUseCase,
    },
    {
      provide: AbstractRecoverUserPasswordUseCase,
      useClass: RecoverUserPasswordUseCase,
    },
    {
      provide: AbstractSendUserEmailUpdateLinkUseCase,
      useClass: SendUserEmailUpdateLinkUseCase,
    },
    {
      provide: AbstractSendUserPasswordRecoveryLinkUseCase,
      useClass: SendUserPasswordRecoveryLinkUseCase,
    },
    {
      provide: AbstractUpdateUserEmailUseCase,
      useClass: UpdateUserEmailUseCase,
    },
    {
      provide: AbstractUpdateUserPasswordUseCase,
      useClass: UpdateUserPasswordUseCase,
    },
    {
      provide: AbstractUserLoginUseCase,
      useClass: UserLoginUseCase,
    },
    {
      provide: AbstractUserVerifyEmailUseCase,
      useClass: UserVerifyEmailUseCase,
    },
  ],
  exports: [
    {
      provide: AbstractCreateUserUseCase,
      useClass: CreateUserUseCase,
    },
    {
      provide: AbstractDeleteUserUseCase,
      useClass: DeleteUserUseCase,
    },
    {
      provide: AbstractRecoverUserPasswordUseCase,
      useClass: RecoverUserPasswordUseCase,
    },
    {
      provide: AbstractSendUserEmailUpdateLinkUseCase,
      useClass: SendUserEmailUpdateLinkUseCase,
    },
    {
      provide: AbstractSendUserPasswordRecoveryLinkUseCase,
      useClass: SendUserPasswordRecoveryLinkUseCase,
    },
    {
      provide: AbstractUpdateUserEmailUseCase,
      useClass: UpdateUserEmailUseCase,
    },
    {
      provide: AbstractUpdateUserPasswordUseCase,
      useClass: UpdateUserPasswordUseCase,
    },
    {
      provide: AbstractUserLoginUseCase,
      useClass: UserLoginUseCase,
    },
    {
      provide: AbstractUserVerifyEmailUseCase,
      useClass: UserVerifyEmailUseCase,
    },
  ],
})
export class UsersModule {}
