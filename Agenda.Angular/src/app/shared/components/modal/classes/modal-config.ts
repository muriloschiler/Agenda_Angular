import { ComponentType } from "@angular/cdk/portal";
import { MatDialogConfig } from "@angular/material/dialog";

export class ModalConfig<TData = any, TComp = any> extends MatDialogConfig<TData>{
    override data?: TData;
    title!: string;
    icon!: string;
    componentToRender!: ComponentType<TComp>;
}
