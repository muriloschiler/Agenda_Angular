export class ApiBaseResponse<T> {
    data!: T[]
    skip!:number 
    take!:number
    total!:number
}
