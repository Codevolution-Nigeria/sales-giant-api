import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerService } from "./customer.service";
import { Customer } from "./entities/customer.entity";
import { CustomerRepository } from "./repositories/customer.repository";



@Module({
    providers:[CustomerService, CustomerRepository],
    controllers:[],
    imports:[
        TypeOrmModule.forFeature([Customer])
    ],
    exports:[CustomerService]
})

export class CustomerModule{}