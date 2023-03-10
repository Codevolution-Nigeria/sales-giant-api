import { Module } from "@nestjs/common";
import { CustomerModule } from "src/customer/customer.module";
import { NotificationModule } from "src/notification/notification.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";


@Module({
    providers:[AuthService],
    controllers:[AuthController],
    imports:[CustomerModule,NotificationModule]
})
export class AuthModule{}