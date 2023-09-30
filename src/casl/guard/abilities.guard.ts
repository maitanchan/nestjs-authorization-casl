import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { CaslAbilityFactory } from "../casl-ability.factory";
import { RequireRule } from "../interface/require-rule.interface";
import { CHECK_ABILITIES_KEY } from "../decorator/ability.decorator";
import { ForbiddenError } from "@casl/ability";

@Injectable()
export class AbilitiesGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector,
        private readonly caslAbilitiesFactory: CaslAbilityFactory
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const rules = this.reflector.get<RequireRule[]>(CHECK_ABILITIES_KEY, context.getHandler()) || []

        // const { user } = context.switchToHttp().getRequest()

        const user = { id: 1, isAdmin: false, orgId: 1 }

        const ability = this.caslAbilitiesFactory.createForUser(user)

        try {

            rules.forEach(rule => ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject))

            return true

        } catch (error) {

            if (error instanceof ForbiddenError) {

                throw new ForbiddenException(error.message)

            }

        }

    }

}