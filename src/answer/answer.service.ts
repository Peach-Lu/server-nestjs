import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Answer} from './schema/answer.schema'
@Injectable()
export class AnswerService {
    coonstructor(
        @InjectModel(Answer.name) private readonly answerModel
    )
}
