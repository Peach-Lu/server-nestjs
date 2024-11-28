import { Body, Controller,Get, Param, Patch, Query, HttpException,HttpStatus, Post } from '@nestjs/common';
import { QuestionDto } from './dto/question.dbo'
import {QuestionService} from './question.service'

@Controller('question')
export class QuestionController {
    constructor(
        private readonly questionService: QuestionService
    ) {

    }
    @Get('test')
    getTest():string {
        throw new HttpException('获取数据失败',HttpStatus.BAD_REQUEST)
    }

    @Post()
    create(data){
        return this.questionService.create()
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
        return this.questionService.findOne(id)
        // return {
        //     id:id,
        //     time:new Date().getTime(),
        //     title:'aaaa',
        //     desc:'bbb',
        //     host:process.env.MONGO_HOST
        // }
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
