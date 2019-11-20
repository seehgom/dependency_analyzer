import {LiteralExpressionNode} from './LiteralExpressionNode';
import {IdentifierExpressionNode} from './IdentifierExpressionNode';
import { plainToClass, Type } from 'class-transformer';
import { NodeExpression } from './NodeExpression';

export class VariableInitializationExpressionNode implements NodeExpression {
  type: "VariableDeclarator" ="VariableDeclarator";
  @Type(() => IdentifierExpressionNode)
  id!: IdentifierExpressionNode;
  @Type(() => LiteralExpressionNode)
  init!: LiteralExpressionNode;
  
  constructor( type: "VariableDeclarator", id: IdentifierExpressionNode, init: LiteralExpressionNode ) {
    this.type = "VariableDeclarator";
    this.id = id;
    this.init = init;
  }
  
  static fromJson(jsonData): VariableInitializationExpressionNode {
    return plainToClass(VariableInitializationExpressionNode, jsonData);
  }
}
