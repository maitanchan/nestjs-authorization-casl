import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CaslAbilityModule } from './casl/casl-ability.module';
import { AbilitiesGuard } from './casl/guard/abilities.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({

  imports: [
    UserModule,
    CaslAbilityModule
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: AbilitiesGuard
    }
  ]

})
export class AppModule { }
