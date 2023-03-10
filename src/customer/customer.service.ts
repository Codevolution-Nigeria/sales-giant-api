import { Injectable } from "@nestjs/common";
import { ICustomer, ICustomerData } from "./interfaces";
import { CustomerRepository } from "./repositories/customer.repository";


@Injectable()
export class CustomerService{

    constructor(private readonly customerRepository:CustomerRepository){}

    async checkCustomer(email:string){
        return await this.customerRepository.findOneBy({email})
    }

    async createCustomer(customerData:ICustomerData):Promise<ICustomer>{
       return this.customerRepository.save(customerData)
    }
    
    async activateCustomer(id:string):Promise<any>{
        return await this.customerRepository.save({id,status:true,isEmailVerified:true})
    }

    async resetPassword(password:string, id:string){
        return await this.customerRepository.save({id,password})
    }
}