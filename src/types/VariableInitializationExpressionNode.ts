import {LiteralExpressionNode} from './LiteralExpressionNode';
import {IdentifierExpressionNode} from './IdentifierExpressionNode';
import { plainToClass, Type } from 'class-transformer';

export class VariableInitializationExpressionNode {
  type!: "VariableDeclarator";
  @Type(() => IdentifierExpressionNode)
  id!: IdentifierExpressionNode;
  @Type(() => LiteralExpressionNode)
  init!: LiteralExpressionNode;
  
  constructor( type: "VariableDeclarator", id: IdentifierExpressionNode, init: LiteralExpressionNode ) {
    this.type = type;
    this.id = id;
    this.init = init;
  }
  
  static fromJson(jsonData): VariableInitializationExpressionNode {
    return plainToClass(VariableInitializationExpressionNode, jsonData);
  }
}
