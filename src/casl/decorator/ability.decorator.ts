import { SetMetadata } from "@nestjs/common";
import { RequireRule } from "../interface/require-rule.interface";

export const CHECK_ABILITIES_KEY = 'abilities_key'

export const CheckAbilities = (...requirements: RequireRule[]) => SetMetadata(CHECK_ABILITIES_KEY, requirements)

