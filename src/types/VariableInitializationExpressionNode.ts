import {Literal} from './Literal';
import {Identifier} from './Identifier';
import { plainToClass, Type } from 'class-transformer';
import { NodeExpression } from './NodeExpression';

export class VariableInitializationExpressionNode implements NodeExpression {
  type: "VariableDeclarator" ="VariableDeclarator";
  @Type(() => Identifier)
  id!: Identifier;
  @Type(() => Literal)
  init!: Literal;
  
  constructor( type: "VariableDeclarator", id: Identifier, init: Literal ) {
    this.type = "VariableDeclarator";
    this.id = id;
    this.init = init;
  }
  
  static fromJson(jsonData): VariableInitializationExpressionNode {
    return plainToClass(VariableInitializationExpressionNode, jsonData);
  }
}
