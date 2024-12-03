import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
import { User } from './schema/schema';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly UserModel) {}
    async create(userData:CreateUserDto){
        const createdUser =  new this.UserModel(userData)
        return createdUser.save()
    }
    async findOne(username:string,password:string){
        return await this.UserModel.findOne({username,password})
    }
}
