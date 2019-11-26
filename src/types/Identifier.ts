import { plainToClass } from 'class-transformer';
import { NodeExpression } from './NodeExpression';
import { Literal } from './Literal';
import { ArrayExpression } from './ArrayExpression';
import { IdentifierStorage } from '../uitility/IdentifierStorage';
import { ObjectExpression } from './ObjectExpression';
import { FileImport } from './FileImport';
import { FunctionExpression } from './FunctionExpression';

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
  getValue(): FileImport | Literal | ArrayExpression | ObjectExpression | FunctionExpression {
    const value = IdentifierStorage.getIdentifierValue(this);
    if (value instanceof Identifier){
      return value.getValue();
    } else {
      return value;
    }
  }
}
