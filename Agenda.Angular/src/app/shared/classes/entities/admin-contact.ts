import { Contact } from "./contact";
import { User } from "./user";

export class AdminContact extends Contact{
    userId!:number
    user!:User
}
