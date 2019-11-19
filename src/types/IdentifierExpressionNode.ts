import { plainToClass } from 'class-transformer';

export class IdentifierExpressionNode {
  type!: "Identifier";
  name!: string;
  
  constructor( type: "Identifier", name: "moduleName" ) {
    this.type = type;
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
}
