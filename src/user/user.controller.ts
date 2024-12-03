import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service'
import { CreateUserDto } from './dto/user.dto';
@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Post('register')
    async register(
        @Body() userDto:CreateUserDto
    ){
        try{
            return await this.userService.create(userDto)
        }catch(err){
            throw new HttpException(err,HttpStatus.BAD_REQUEST)
        }
    }
}
