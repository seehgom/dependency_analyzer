import {FunctionExpressionNode} from './FunctionExpressionNode';
import {LiteralExpressionNode} from './LiteralExpressionNode';
import {IdentifierExpressionNode} from './IdentifierExpressionNode';
import {CallExpressionNode} from './CallExpressionNode';
import { plainToClass, Type } from 'class-transformer';
import { NodeExpression } from './NodeExpression';
export class ArrayExpression implements NodeExpression {
  type!: "ArrayExpression";
  @Type(() => NodeExpression, {
    discriminator: {
      property: "type",
      subTypes: [
        { value: LiteralExpressionNode, name: "Literal" },
        { value: IdentifierExpressionNode, name: "Identifier" },
        { value: FunctionExpressionNode, name: "FunctionExpression" },
        { value: CallExpressionNode, name: "CallExpression" }
      ]
    }
  })
  elements: [LiteralExpressionNode | IdentifierExpressionNode,  FunctionExpressionNode | IdentifierExpressionNode | CallExpressionNode ]
  static fromJson(jsonData): ArrayExpression {
    return plainToClass(ArrayExpression, jsonData)
  }
  
  constructor( type: "ArrayExpression", elements: [(LiteralExpressionNode | IdentifierExpressionNode), (FunctionExpressionNode | IdentifierExpressionNode | CallExpressionNode)] ) {
    this.type = "ArrayExpression";
    this.elements = elements;
  }
}
