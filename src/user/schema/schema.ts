import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<User>;

@Schema({
    timestamps:true // 记录时间戳 createdAt 和 updateAt
})
export class User {
  @Prop({required: true})
  username: string;

  @Prop()
  password: string;

  @Prop()
  nikename: string;


}

export const UserSchema = SchemaFactory.createForClass(User);