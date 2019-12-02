import { MemberExpression } from './MemberExpression';
import { Identifier } from './Identifier';
import { ArrayExpression } from './ArrayExpression';
import { FileImport } from './FileImport';
import { Literal } from './Literal';
import { ObjectExpression } from './ObjectExpression';
import { FunctionExpression } from './FunctionExpression';
import { CallExpression } from './CallExpression';
import { plainToClass, Type } from 'class-transformer';
import { NodeExpression } from './NodeExpression';

export class AssignmentExpression {
  type: "AssignmentExpression" = "AssignmentExpression";
  operator: string;
  @Type(() => NodeExpression, {
    discriminator: {
      property: "type",
      subTypes: [
        { value: MemberExpression, name: "MemberExpression" },
        { value: Identifier, name: "Identifier" },
        { value: ArrayExpression, name: "ArrayExpression" },
        { value: ObjectExpression, name: "ObjectExpression" }
      ]
    }
  }) private _left: MemberExpression | Identifier | ArrayExpression | ObjectExpression;
  
  get left(): MemberExpression | Identifier | ArrayExpression | ObjectExpression {
    return this._left;
  }
  
  set left( value: MemberExpression | Identifier | ArrayExpression | ObjectExpression ) {
    if(value.type=="MemberExpression"){
      this._left = MemberExpression.fromJson(value);
    } else if(value.type=="Identifier"){
      this._left = Identifier.fromJson(value);
    } else if(value.type=="ArrayExpression"){
      this._left = ArrayExpression.fromJson(value);
    } else if (value.type=="ObjectExpression"){
      this._left = ObjectExpression.fromJson(value);
    } else {
      throw new Error("AssignmentExpression's left side is wrong type, left="+JSON.stringify(value));
    }
  }
  
  @Type(() => NodeExpression, {
    discriminator: {
      property: "type",
      subTypes: [
        { value: Literal, name: "Literal" },
        { value: ObjectExpression, name: "ObjectExpression" },
        { value: FileImport, name: "FileImport" },
        { value: Identifier, name: "Identifier" },
        { value: ArrayExpression, name: "ArrayExpression" },
        { value: FunctionExpression, name: "FunctionExpression" },
        { value: CallExpression, name: "CallExpression" }
      ]
    }
  }) private _right: FileImport | Literal | Identifier | ArrayExpression | ObjectExpression | FunctionExpression | CallExpression;
  
  get right(): FileImport | Literal | Identifier | ArrayExpression | ObjectExpression | FunctionExpression | CallExpression {
    return this._right;
  }
  
  set right( value: FileImport | Literal | Identifier | ArrayExpression | ObjectExpression | FunctionExpression | CallExpression ) {
    if(value.type=="FileImport"){
      this._right = FileImport.fromJson(value);
    } else if(value.type=="Literal"){
      this._right = Literal.fromJson(value);
    } else if(value.type=="Identifier"){
      this._right = Identifier.fromJson(value);
    } else if(value.type=="ArrayExpression"){
      this._right = ArrayExpression.fromJson(value);
    } else if (value.type=="ObjectExpression"){
      this._right = ObjectExpression.fromJson(value);
    } else if (value.type=="FunctionExpression"){
      this._right = FunctionExpression.fromJson(value);
    } else if (value.type=="CallExpression"){
      this._right = CallExpression.fromJson(value);
    } else {
      throw new Error("AssignmentExpression's right side is wrong type, left="+JSON.stringify(value));
    }
    this._right = value;
  }
  
  isAngularJSComponentExportArray(): boolean {
    return this.left instanceof MemberExpression && this.left.isModuleExports() &&
      this.right instanceof ArrayExpression && this.right.isAngularJSComponentDepsBody();
  }
  
  getAngularJSComponentExportArray(): Array<Literal | FileImport | ArrayExpression | ObjectExpression | FunctionExpression > {
    if(this.isAngularJSComponentExportArray() && this.right instanceof ArrayExpression){
      return this.right.getElementsWithLiterals();
    }
  }
  
  static fromJson(value): AssignmentExpression {
    return plainToClass(AssignmentExpression, value);
  }
}
