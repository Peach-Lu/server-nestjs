import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  HttpException,
  HttpStatus,
  Post,
  Delete,
} from '@nestjs/common';
import { QuestionDto } from './dto/question.dbo';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  @Get('test')
  getTest(): string {
    throw new HttpException('获取数据失败', HttpStatus.BAD_REQUEST);
  }

  @Post()
  create(data) {
    return this.questionService.create();
  }

  @Get()
  async findAll(
    @Query('keyword') keyword: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    console.log(keyword, page, pageSize);
    const list =  await this.questionService.findAll({keyword, page, pageSize})
    const count = await this.questionService.countAll({keyword})
    return {
        list,
        count
    }
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
   
  }
  @Post(':id')
  updateOne(@Param('id') id: string, @Body() questionDto: QuestionDto) {
    console.log('questionDto', questionDto);
    console.log('id', id);
    return this.questionService.update(id,questionDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.questionService.delete(id);
  }
}
