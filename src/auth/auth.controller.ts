import { Body, Controller, Get, Post, Request, 
    // UseGuards 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/user.dto';
// import { AuthGuard } from './auth.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}
    
    @Public()
    @Post('login')
    async login(@Body() userInfo:CreateUserDto){
         const { username,password } = userInfo
         return await this.authService.signIn(username,password)
    }
    // @UseGuards(AuthGuard) //增加token解析
    @Get('profile')
    async getProfile(
        @Request() req
    ){
        console.log('req',req)
        return req.user
    }
}
