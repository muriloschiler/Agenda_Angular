import { Register } from "./core/register"
import { Phone } from "./phone"

export class Contact extends Register {
    name!:string
    phones!:Phone[]
}
