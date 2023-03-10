import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";



export class ResetPasswordDto{

    @ApiProperty({
        type:String,
        required:true
    })
    @IsNotEmpty()
    readonly password:string


    @ApiProperty({
        type:String,
        required:true
    })
    @IsNotEmpty()
    readonly token:string

}