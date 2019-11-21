import {BlockStatement} from './BlockStatement';
import {Identifier} from './Identifier';
import { NodeExpression } from './NodeExpression';
import { plainToClass } from 'class-transformer';
export class FunctionExpression implements NodeExpression {
  type: "FunctionExpression" = "FunctionExpression";
  id = null
  params!: Identifier[]
  defaults: any[]
  body: BlockStatement
  generator = false
  expression = false
  
  static fromJson( jsonData ): FunctionExpression {
    return plainToClass(FunctionExpression, jsonData);
  }
}
