import { Enumeration } from "./core/enumeration";
import { Register } from "./core/register";

export class User extends Register{
    name!: string;
    username!: string;
    password?: string;
    email!: string;
    userRole!: Enumeration;
    userRoleId?: number;
}
