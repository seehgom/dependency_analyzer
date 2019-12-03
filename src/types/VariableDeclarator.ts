import {Literal} from './Literal';
import {Identifier} from './Identifier';
import { plainToClass, Type } from 'class-transformer';
import { NodeExpression } from './NodeExpression';
import { ObjectExpression } from './ObjectExpression';
import * as _ from 'lodash';
import { IdentifierStorage } from '../uitility/IdentifierStorage';
import { ArrayExpression } from './ArrayExpression';
import { FunctionExpression } from './FunctionExpression';
import { FileImport } from './FileImport';
import { CallExpression } from './CallExpression';

export class VariableDeclarator implements NodeExpression {
  type: "VariableDeclarator" = "VariableDeclarator";
  @Type(() => Identifier) private _id?: Identifier;
  
  get id(): Identifier {
    return this._id;
  }
  
  set id( value: Identifier ) {
    if (_.isNil(value) || value.type!=="Identifier") throw new Error("VariableDeclaration id can either be undefined or be an identifier but is "+JSON.stringify(value));
    this._id = Identifier.fromJson(value);
    this.checkAndLoadToStorage();
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
  }) private _init: FileImport | Literal | Identifier | ArrayExpression | ObjectExpression | FunctionExpression | CallExpression;
  
  get init(): FileImport | Literal | Identifier | ArrayExpression | ObjectExpression | FunctionExpression | CallExpression {
    return this._init;
  }
  
  set init( value: FileImport | Literal | Identifier | ArrayExpression | ObjectExpression | FunctionExpression | CallExpression) {
    if (_.isNil(value)) throw new Error("VariableDeclarator's init property cannot be undefined, but is "+JSON.stringify(value));
    if (value.type=="Literal"){
      this._init = Literal.fromJson(value);
    } else if (value.type=="ObjectExpression") {
      this._init = ObjectExpression.fromJson(value);
    } else if (value.type=="Identifier"){
      this._init = Identifier.fromJson(value);
    } else if (value.type=="ArrayExpression"){
      this._init = ArrayExpression.fromJson(value);
    } else if (value.type=="FunctionExpression"){
      this._init = FunctionExpression.fromJson(value);
    } else if (value.type=="FileImport"){
      this._init = FileImport.fromJson(value);
    } else if (value.type=="CallExpression"){
      this._init = CallExpression.fromJson(value);
    } else {
      throw new Error("VariableDeclaration init property can either be undefined, a literal or an object expression but is "+JSON.stringify(value));
    }
    this.checkAndLoadToStorage();
  }
  
  private checkAndLoadToStorage(): void {
    if (!this.id || !this.init) return;
    if (this.init instanceof Literal){
      IdentifierStorage.setIdentifierValue(this.id, this.init);
    } else if (this.init instanceof Identifier) {
      const valueStoredForVariable = this.init.getValue();
      if (!valueStoredForVariable) throw new Error("Cannot set variable equal to unfilled variable, problem variable name is"+this.id.name);
      IdentifierStorage.setIdentifierValue(this.id, valueStoredForVariable);
    } else if (this.init instanceof ArrayExpression){
        IdentifierStorage.setIdentifierValue(this.id, this.init.getArrayExpressionWithLiterals());
    } else if(this.id instanceof Identifier && this.init instanceof CallExpression && this.init.isRequireStatment()){
        IdentifierStorage.setIdentifierValue(this.id, this.init.getFileImport());
    // } else if(this.id instanceof Identifier && this.init instanceof FunctionExpression){
    //   IdentifierStorage.setIdentifierValue(this.id, this.init);
    } else {
      IdentifierStorage.setIdentifierValue(this.id, this.init);
    }
  }
  
  
  static fromJson(jsonData): VariableDeclarator {
    return plainToClass(VariableDeclarator, jsonData);;
  }
  
  isInitalization(): boolean {
    return !!this.init;
  }
  isLiteralInitalization(): boolean {
    return this.isInitalization() && this.init instanceof Literal;
  }
}
