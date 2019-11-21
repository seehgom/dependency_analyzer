import {CallExpression} from './CallExpression';
import { NodeExpression } from './NodeExpression';
import { plainToClass, Type } from 'class-transformer';
export class ExpressionStatement implements NodeExpression {
  type: "ExpressionStatement" = "ExpressionStatement";
  @Type(() => CallExpression)
  expression!: CallExpression;
  
  static fromJson( jsonData ) {
    return plainToClass(ExpressionStatement, jsonData);
  }
}
