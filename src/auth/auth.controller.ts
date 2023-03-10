import { Controller,Post,Put,Body, Patch,Param, Get } from "@nestjs/common";
import { CreateCustomerDto } from "src/customer/dto/create-customer.dto";
import { LoginCustomerDto } from "src/customer/dto/login-customer-dto";
import { AuthService } from "./auth.service";
import { ResetPasswordDto } from "./dto/create-account-dto";



@Controller("auth")
export class AuthController{

    constructor(private readonly authService:AuthService){}
    
    @Post('customer/login')
    customerLogin(@Body() loginDto:LoginCustomerDto){
        return this.authService.loginCustomer(loginDto)
    }

    @Post('customer/register')
    customerRegister(@Body() createCustomerDto:CreateCustomerDto){
        return this.authService.createCustomer(createCustomerDto)
    }

    @Get('verify/:token')
    verify(@Param("token") token:string){
        return this.authService.verifyToken(token)
    }

    @Patch('activate/:token')
    activate(@Param("token") token:string){
        return this.authService.activateAccount(token)
    }
   
    @Patch("reset-password")
    resetPassword(@Body() resetPasswordDto:ResetPasswordDto){
        return this.authService.resetPassword(resetPasswordDto.token, resetPasswordDto.password)
    }
    
}