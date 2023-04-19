import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT_KEY } from '@/shared';
import { AbstractJsonWebTokenService } from '@/core/ports';
import { JwtStrategy } from './strategies';
import { JsonWebTokenService } from './json-web-token.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_KEY,
    }),
  ],
  providers: [
    {
      provide: AbstractJsonWebTokenService,
      useClass: JsonWebTokenService,
    },
    JwtStrategy,
  ],
  exports: [
    {
      provide: AbstractJsonWebTokenService,
      useClass: JsonWebTokenService,
    },
    JwtStrategy,
  ],
})
export class JsonWebTokenModule {}
