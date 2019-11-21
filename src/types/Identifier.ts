import { plainToClass } from 'class-transformer';
import { NodeExpression } from './NodeExpression';

export class Identifier implements NodeExpression {
  type: "Identifier" = "Identifier";
  name!: string;
  
  constructor( type: "Identifier", name: "moduleName" ) {
    this.type = "Identifier";
    this.name = name;
  }
  static fromJson(jsonData): Identifier {
    return plainToClass(Identifier, jsonData);
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
