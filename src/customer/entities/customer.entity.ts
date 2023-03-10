import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import {CustomerType} from '../interfaces'

@Entity()
export class Customer extends BaseEntity{


    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({
        length:20,
        nullable:false
    })
    firstName:string

    @Column({
        length:50,
        nullable:false
    })
    lastName:string

    @Column({
        type:'enum',
        enum:CustomerType,
        default:CustomerType.INDIVIDUAL,
        nullable:false
    })
    type:CustomerType

    @Column({
        length:150,
        nullable:true
    })
    businessName:string

    @Column({
        length:255,
        nullable:false
    })
    email:string

    @Column({
        length:255,
        nullable:false
    })
    phoneNumber:string

    @Column({
        length:255,
        nullable:false
    })
    password:string


    @Column({
        nullable:false,
        default:false
    })
    isEmailVerified:boolean

    @Column({
        nullable:false,
        default:false
    })
    status:boolean

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}