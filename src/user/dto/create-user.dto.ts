import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({description:'账号',example:'13722111111'})
  @IsNotEmpty({message:'账号为必填'})
  readonly phone:string;

  @ApiProperty({description:'密码',example:'12345'})
  @IsNotEmpty({message:'密码为必填'})
  readonly password:string;

  @ApiPropertyOptional({description:'昵称',example:'hook'})
  readonly nickname:string;

  @ApiPropertyOptional({description:'头像',example:'http://localhost/img/1.png'})
  readonly avatar:string;
}
