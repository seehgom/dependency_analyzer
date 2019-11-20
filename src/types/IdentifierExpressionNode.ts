import { plainToClass } from 'class-transformer';
import { NodeExpression } from './NodeExpression';

export class IdentifierExpressionNode implements NodeExpression {
  type: "Identifier" = "Identifier";
  name!: string;
  
  constructor( type: "Identifier", name: "moduleName" ) {
    this.type = "Identifier";
    this.name = name;
  }
  static fromJson(jsonData): IdentifierExpressionNode {
    return plainToClass(IdentifierExpressionNode, jsonData);
  }
  
  isRootMemberExpression(): boolean {
    return true;
  }
  isAngularJSModuleDeclaration(): boolean {
    return false;
  }
  isAngularJSControllerDeclaration(): boolean {
    return false;
  }
  getParent(): string {
    return this.name;
  }
}
