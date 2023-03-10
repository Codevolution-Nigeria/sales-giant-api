import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Customer } from "src/customer/entities/customer.entity";




@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory{
    
    constructor(
        private readonly configService:ConfigService
    ){}

    createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        return{
            type:'mysql',
            host:this.configService.get<string>('DB_URL'),
            port:this.configService.get<number>('DB_PORT'),
            username:this.configService.get<string>('DB_USERNAME'),
            password:this.configService.get<string>('DB_PASSWORD'),
            database:this.configService.get<string>('DB_NAME'),
            entities:[Customer],
            synchronize:true,
            logging:false
        }
    }
}