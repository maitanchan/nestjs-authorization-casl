import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CaslAbilityModule } from '../casl/casl-ability.module';

@Module({

  imports: [
    CaslAbilityModule
  ],

  controllers: [
    UserController
  ],

  providers: [
    UserService
  ]

})
export class UserModule { }
