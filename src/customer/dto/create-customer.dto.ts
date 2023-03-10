import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { CustomerType } from "../interfaces";



export class CreateCustomerDto{

    @ApiProperty({
        type:String,
        required:true
    })
    @IsNotEmpty()
    readonly firstName:string

    @ApiProperty({
        type:String,
        required:true
    })
    @IsNotEmpty()
    readonly lastName:string

    @ApiProperty({
        type:String,
        required:true
    })
    @IsNotEmpty()
    readonly email:string

    @ApiProperty({
        type:String,
        required:true
    })
    @IsNotEmpty()
    readonly phoneNumber:string

    @ApiProperty({
        type:'enum',
        required:true,
        enum:CustomerType,
        default:CustomerType.INDIVIDUAL
    })
    @IsNotEmpty()
    readonly type:CustomerType

    @ApiProperty({
        type:String,
        required:false
    })
    @IsOptional()
    readonly businessName:string

    @ApiProperty({
        type:String,
        required:false
    })
    @IsOptional()
    readonly password:string

}