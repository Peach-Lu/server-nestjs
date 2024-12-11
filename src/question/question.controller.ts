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
  Request,
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
  create(@Request() req) {
    const { username } = req.user;
    return this.questionService.create(username);
  }

  @Get()
  async findAll(
    @Query('keyword') keyword: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('isDeleted') isDeleted: boolean = false,
    @Query('isStar') isStar: boolean = false,
    @Request() req,
  ) {
    console.log(keyword, page, pageSize);
    const { username } = req.user;
    console.log('req', req);
    console.log('req.username', req.username);
    console.log('req', req.user);

    const list = await this.questionService.findAllList({
      keyword,
      page,
      pageSize,
      isDeleted,
      isStar,
      author: username,
    });
    const count = await this.questionService.countAll({
      keyword,
      isDeleted,
      isStar,
      author: username,
    });
    return {
      list,
      count,
    };
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }
  @Post(':id')
  updateOne(@Param('id') id: string, @Body() questionDto: QuestionDto) {
    console.log('questionDto', questionDto);
    console.log('id', id);
    return this.questionService.update(id, questionDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string, @Request() req) {
    return this.questionService.delete(id);
  }
}
