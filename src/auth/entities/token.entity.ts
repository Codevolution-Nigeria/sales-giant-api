import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"


@Entity()
export class Token extends BaseEntity{


    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({
        length:20,
        nullable:false
    })
    token:string

   
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}