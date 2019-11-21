import { plainToClass } from 'class-transformer';
import { NodeExpression } from './NodeExpression';

export class Literal extends NodeExpression {
  type: "Literal" = "Literal";
  value!: string;
  raw!: string;
  
  static fromJson(jsonData): Literal{
    return plainToClass(Literal, jsonData);
  }
}
