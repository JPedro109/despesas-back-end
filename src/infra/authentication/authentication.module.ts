import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT_KEY } from '@/shared';
import { AbstractAuthenticationService } from '@/core/ports';
import { JwtStrategy } from './strategies';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_KEY,
    }),
  ],
  providers: [
    {
      provide: AbstractAuthenticationService,
      useClass: AuthenticationService,
    },
    JwtStrategy,
  ],
  exports: [
    {
      provide: AbstractAuthenticationService,
      useClass: AuthenticationService,
    },
    JwtStrategy,
  ],
})
export class AuthenticationModule {}
