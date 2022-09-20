import { Contact } from "./contact";
import { User } from "./user/user";

export class AdminContact extends Contact{
    userId!:number
    user!:User
}
