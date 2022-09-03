import { Enumeration } from "./core/enumeration";
import { Register } from "./core/register";

export class Phone extends Register{
    phoneType!: Enumeration;
    phoneTypeId?: number;
    description!: string;
    formattedNumber!: string;
    number!: string;
    ddd!: number;
}
