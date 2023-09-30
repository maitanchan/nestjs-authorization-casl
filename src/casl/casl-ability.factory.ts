import { Injectable } from "@nestjs/common";
import { User } from "../user/entities/user.entity";
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability'
import { Action } from "./enum/action.enum";

export type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {

    createForUser(user: User) {

        const { can, cannot, build } = new AbilityBuilder(Ability as AbilityClass<AppAbility>)

        if (user.isAdmin) {

            can(Action.Manage, 'all')
            cannot(Action.Manage, User, { orgId: { $ne: user.orgId } }).because('You can only manage users in your own organization')

        } else {

            can(Action.Read, User, ['id'])
            cannot(Action.Create, User).because('Only Admin Allow To Action')
            cannot(Action.Update, User).because('Only Admin Allow To Action')
            cannot(Action.Delete, User).because('Only Admin Allow To Action')

        }

        return build({ detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects> })

    }

}
