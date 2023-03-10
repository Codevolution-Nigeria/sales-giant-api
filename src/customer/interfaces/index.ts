
export enum CustomerType{
    INDIVIDUAL='Individual',
    BUSINESS='Business'
}


export interface ICustomer{
    id:string
    firstName:string
    lastName:string
    type:CustomerType
    businessName:string
    email:string
    phoneNumber:string
    isEmailVerified:boolean
    status:boolean
    createdAt:Date
    updatedAt:Date
}


export interface ICustomerData{
    firstName:string
    lastName:string
    type:CustomerType
    businessName:string
    email:string
    phoneNumber:string
    password:string
}