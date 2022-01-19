import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id:number;
  
  @Column()
  phone:string;

  @Column({length:100})
  nickname:string;

  @Column()
  @Exclude()
  password:string;

  @Column()
  avatar:string;

  @Column({name:'create_time',type:'timestamp',default:()=> 'CURRENT_TIMESTAMP'})
  createtime:Date;
  
  @Column({name:'update_time',type:'timestamp',default:()=> 'CURRENT_TIMESTAMP'})
  updatetime:Date;

  @BeforeInsert()
  encrypt() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
