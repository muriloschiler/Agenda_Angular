export class ApiPaginationResponse<T> {
    data!: T[]
    skip!:number 
    take!:number
    total!:number
}
