import { plainToClass } from 'class-transformer';
import { NodeExpression } from './NodeExpression';

export class LiteralExpressionNode extends NodeExpression {
  type: "Literal" = "Literal";
  value!: string;
  raw!: string;
  
  static fromJson(jsonData): LiteralExpressionNode{
    return plainToClass(LiteralExpressionNode, jsonData);
  }
}
