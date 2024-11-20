import { Body, Controller,Get, Param, Patch, Query, HttpException,HttpStatus } from '@nestjs/common';
import { QuestionDto } from './dto/question.dbo'

@Controller('question')
export class QuestionController {
    
    @Get('test')
    getTest():string {
        throw new HttpException('获取数据失败',HttpStatus.BAD_REQUEST)
    }
    @Get()
    findAll(
        @Query('keyword') keyword:string,
        @Query('page') page:number,
        @Query('pageSize') pageSize:number
    ) {
        console.log(keyword, page, pageSize)
        return {
            list:['a','b','c'],
            keyword,
            count:10
        }
    }
    @Get(':id')
    findOne(
        @Param('id') id:string
    ){
        return {
            id:id+new Date(),
            title:'aaaa',
            desc:'bbb'
        }
    }
    @Patch(':id')
    updataOne(
        @Param('id') id:string,
        @Body() questionDto:QuestionDto
    ){
        console.log('questionDto',questionDto)
        return {
            id,
            title:questionDto.title,
            desc:questionDto.desc
        }
    }

}
