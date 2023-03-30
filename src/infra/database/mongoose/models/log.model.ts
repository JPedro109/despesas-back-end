import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LogDocument = HydratedDocument<LogExpense>;

@Schema()
export class LogExpense {
  @Prop()
  message: string;

  @Prop()
  stack: string;

  @Prop()
  name: string;

  @Prop()
  created_at: Date;
}

export const LogSchema = SchemaFactory.createForClass(LogExpense);
