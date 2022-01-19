import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { getRepository, Repository } from 'typeorm';

export interface userRo{
  list:UserEntity[];
  count:number;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }
    
  /**
   * 创建用户
   * @param user 
   */
  async create(user: Partial<UserEntity>): Promise<UserEntity> {
    const { phone, password } = user;
    if (!phone || !password) {
      throw new HttpException('请输入用户名和密码', HttpStatus.BAD_REQUEST)
    }
    const exisUser = await this.userRepository.findOne({ where: { phone } });
    if (exisUser) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST)
    }
    const newUser = await this.userRepository.create(user)
    await this.userRepository.save(newUser)
    return newUser;
  }

  /**
   * 获取用户列表
   * @param 
   */
  async findAll(query):Promise<userRo> {
    const qb = await getRepository(UserEntity).createQueryBuilder('user');
    qb.where('1 = 1')
    qb.orderBy('user.create_time','DESC')
    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize)
    qb.offset(pageSize * (pageNum - 1))
    const users = await qb.getMany();
    return {
      list:users,
      count,
    }
  }

  /**
   * 获取单个用户
   * @param id 
   */
  async findOne(id: number): Promise<UserEntity>  {
    return await this.userRepository.findOne(id);
  }

  /**
   * 更新用户信息
   * @param id 
   * @param updateUserDto 
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
    const existUser = await this.userRepository.findOne(id);
    if(!existUser){
      throw new HttpException(`id为${id}的用户不存在`,401);
    }
    const updateUser = this.userRepository.merge(existUser,updateUserDto)
    return this.userRepository.save(updateUser)
  }

  /**
   * 删除用户
   * @param id
   */
  async remove(id: number) {
    const existUser = await this.userRepository.findOne(id);
    if(!existUser){
      throw new HttpException(`id为${id}的用户不存在`,401);
    }
    return await this.userRepository.remove(existUser)
  }
}
