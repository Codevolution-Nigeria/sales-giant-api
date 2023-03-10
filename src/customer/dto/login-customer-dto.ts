import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { CustomerType } from "../interfaces";



export class LoginCustomerDto{

    @ApiProperty({
        type:String,
        required:true
    })
    @IsNotEmpty()
    readonly email:string

    @ApiProperty({
        type:String,
        required:false
    })
    @IsOptional()
    readonly password:string

}