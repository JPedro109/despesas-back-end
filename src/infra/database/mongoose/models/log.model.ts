import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LogDocument = HydratedDocument<LogExpense>;

@Schema()
export class LogExpense {
  @Prop()
  level: string;

  @Prop()
  title: string;

  @Prop()
  message: string;

  @Prop({ default: null })
  trace?: string;

  @Prop()
  created_at: Date;
}

export const LogSchema = SchemaFactory.createForClass(LogExpense);
