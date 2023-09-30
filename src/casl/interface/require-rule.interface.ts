import { Action } from "../enum/action.enum"
import { Subjects } from "../casl-ability.factory"

export interface RequireRule {

    action: Action

    subject: Subjects

}