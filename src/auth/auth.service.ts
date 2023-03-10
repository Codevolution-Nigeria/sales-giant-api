import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { CustomerService } from "src/customer/customer.service";
import { CreateCustomerDto } from "src/customer/dto/create-customer.dto";
import { LoginCustomerDto } from "src/customer/dto/login-customer-dto";
import { ICustomer } from "src/customer/interfaces";
import * as jwt from 'jsonwebtoken'
import { EmailService } from "src/notification/email/email.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService{

    private readonly jwtSecret = "hchfjhhjfjdjfghghdhfhd%^$^^%%^%^"

    constructor(
        private readonly customerService: CustomerService,
        private readonly emailService: EmailService,
        private readonly configService: ConfigService){}

    hashPassword(myPlaintextPassword:string):string{
        const salt = bcrypt.genSaltSync(10);
        return  bcrypt.hashSync(myPlaintextPassword, salt);
    }

    async comparePassword(hash:string, plain:string):Promise<boolean>{
        return await bcrypt.compare(plain, hash);
    }

    signToken(data:any){
        return jwt.sign(data,this.jwtSecret)
    }

    unsignToken(token:string){
      return jwt.verify(token,this.jwtSecret)
    }

    async verifyToken(token:string):Promise<ICustomer>{
        const {email, createdAt} = this.unsignToken(token) as any
        
        const isExpired = new Date(createdAt) > new Date()

        if(isExpired){
            throw new HttpException("Token is expired", HttpStatus.FORBIDDEN)
        }

        const customer = await this.customerService.checkCustomer(email)

        if(!customer){
            throw new HttpException("Token is expired", HttpStatus.FORBIDDEN)
        }

        return this.customerService.activateCustomer(customer.id)

    }

    async resetPassword(token:string, password:string){
        try{
            const customer = await this.verifyToken(token)
            const hashPassword = this.hashPassword(password)
            
            return await this.customerService.resetPassword(hashPassword, customer.id)

        }catch(error:any){
            throw new HttpException(error.message, error.status)
        }
    }

    async activateAccount(token:string):Promise<ICustomer>{
        try{
           const customer = await this.verifyToken(token)
            return await this.customerService.activateCustomer(customer.id)
        }catch(error:any){
            throw new HttpException(error.message, error.status)
        }
    }

    async createCustomer(createCustomerDto:CreateCustomerDto):Promise<ICustomer>{
        try{
            const {email,password} = createCustomerDto

            const isExist = await this.customerService.checkCustomer(email)
            if(isExist){
                throw new HttpException("Email is taken", HttpStatus.CONFLICT)
            }

            const hashPassword = this.hashPassword(password)

            const customer = await this.customerService.createCustomer({
                ...createCustomerDto,
                 password: hashPassword,
            })

            const token = this.signToken({email:createCustomerDto.email,createdAt:new Date()})
            // send email

            this.emailService.send({
                    to:email,
                    templateId:this.configService.get<string>('CUSTOMER_ACTIVATION_EMAIL_TEMPLATE_ID'),
                    from:{
                        name:"SalesGiant",
                        email:'support@celz3.org'
                    },
                    dynamicTemplateData:{
                        url:`https://apps.celz3.org/signup/verify?token=${token}`
                    }
                })

            return customer
        }catch(error:any){
            throw new HttpException(error.message, error.status)
        }
    }

    async loginCustomer(loginCustomerDto:LoginCustomerDto):Promise<ICustomer>{
        try{
            const customer = await this.customerService.checkCustomer(loginCustomerDto.email)

            if(!customer){
                throw new HttpException("Email and password combination is wrong", HttpStatus.NOT_FOUND)
            }

            const isPasswordCorrect = this.comparePassword(customer.password, loginCustomerDto.password)

            if(!isPasswordCorrect){
                throw new HttpException("Email and password combination is wrong", HttpStatus.NOT_FOUND)
            }

            return customer
        }catch(error:any){
            throw new HttpException(error.message, error.status)
        }
    }
    
}