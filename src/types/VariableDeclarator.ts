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
        { value: FunctionExpression, name: "FunctionExpression" }
      ]
    }
  }) private _init?: FileImport | Literal | Identifier | ArrayExpression | ObjectExpression | FunctionExpression;
  
  get init(): FileImport | Literal | Identifier | ArrayExpression | ObjectExpression | FunctionExpression{
    return this._init;
  }
  
  set init( value: FileImport | Literal | Identifier | ArrayExpression | ObjectExpression | FunctionExpression) {
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
    } else {
      throw new Error("VariableDeclaration init property can either be undefined, a literal or an object expression but is "+JSON.stringify(value));
    }
    this.checkAndLoadToStorage();
  }
  
  private checkAndLoadToStorage(): void {
    if (!this._id && !this._init) return;
    if (this._init instanceof Literal){
      IdentifierStorage.setIdentifierValue(this._id, this._init);
    } else if (this._init instanceof Identifier) {
      const valueStoredForVariable = this._init.getValue();
      if (!valueStoredForVariable) throw new Error("Cannot set variable equal to unfilled variable, problem variable name is"+this._id.name);
      IdentifierStorage.setIdentifierValue(this._id, valueStoredForVariable);
    } else if (this._init instanceof ArrayExpression){
      const arrayRaw = [...this._init.elements];
      const arrayWithLiterals: [] = arrayRaw.length==0?[]:_.reduce(arrayRaw, (arraySoFar, element)=>{
        if (element.type=="Identifier") {
          const ElementAsIdentifier = Identifier.fromJson(element);
          const value = ElementAsIdentifier.getValue();
          return [...arraySoFar, value];
        } else {
          return [...arraySoFar, element];
        }
      }, []);
      const newArrayExpressionWithLiteralElements = new ArrayExpression('ArrayExpression',arrayWithLiterals)
      IdentifierStorage.setIdentifierValue(this._id, newArrayExpressionWithLiteralElements);
    } else {
      IdentifierStorage.setIdentifierValue(this._id, this._init);
    }
  }
  
  
  static fromJson(jsonData): VariableDeclarator {
    return plainToClass(VariableDeclarator, jsonData);;
  }
  
  isInitalization(): boolean {
    return !!this._init;
  }
  isLiteralInitalization(): boolean {
    return this.isInitalization() && this._init instanceof Literal;
  }
}
