import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as SendGrid from '@sendgrid/mail';


@Injectable()
export class EmailService{

    constructor(private readonly configService: ConfigService) {
        SendGrid.setApiKey(this.configService.get<string>('SENDGRID_KEY'));
      }


    async send(mail: SendGrid.MailDataRequired) {
        const transport = await SendGrid.send(mail);
        // avoid this on production. use log instead :)
        console.log(`E-Mail sent to ${mail.to}`);
        return transport;
    }

    // this.send({
    //     to:payload.to,
    //     templateId:'d-7552b7b028014f00a0043549cd08325d',
    //     from:{
    //         name:"ChurchOs",
    //         email:'support@celz3.org'
    //     },
    //     dynamicTemplateData:{
    //         church:payload.church,
    //         name:payload.name,
    //         url:`https://apps.celz3.org/signup/verify?token=${payload.token}`
    //     }
    // })
    
}