import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './schema/schema';

@Injectable()
export class QuestionService {
  constructor(
    // 依赖注入
    @InjectModel(Question.name) private readonly questionModel,
  ) {}
  async create() {
    const question = await this.questionModel({
      title: 'title' + Date.now(),
      desc: 'desc',
    });
    return await question.save();
  }
  async delete(id: string) {
    return await this.questionModel.findByIdAndDelete(id);
  }
  async update(id: string, updateData: object) {
    return await this.questionModel.updateOne({ _id: id }, updateData);
  }
  async findOne(id: string) {
    return await this.questionModel.findById(id);
  }
  async findAll({ keyword = '', page = 1, pageSize = 10 }: any) {
    const whereOpt: any = {};
    if (keyword) {
      const reg = new RegExp(keyword, 'i');
      whereOpt.title = { $regex: reg }; //模糊搜索
    }
    return await this.questionModel
    .find(whereOpt)
    .sort({ _id: -1 }) // 逆序排序
    .skip((page - 1) * pageSize) //分页
    .limit(pageSize) // 页数
  }
  async countAll({keyword=''}){
    const whereOpt: any = {};
    if (keyword) {
      const reg = new RegExp(keyword, 'i');
      whereOpt.title = { $regex: reg }; //模糊搜索
    }
    return await this.questionModel.countDocuments(whereOpt);
  }
}
