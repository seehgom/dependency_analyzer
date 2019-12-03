import { Identifier } from './Identifier';
import { Literal } from './Literal';
import { ArrayExpression } from './ArrayExpression';
import { ObjectExpression } from './ObjectExpression';
import { BlockStatement } from './BlockStatement';
import { plainToClass, Type } from 'class-transformer';
import { NodeExpression } from './NodeExpression';
import * as _ from 'lodash';
import { IdentifierStorage } from '../uitility/IdentifierStorage';
import { CallExpression } from './CallExpression';

export class FunctionDeclaration {
  type: "FunctionDeclaration" = "FunctionDeclaration";
  @Type(()=>Identifier) private _id: Identifier;
  
  get id(): Identifier {
    return this._id;
  }
  
  set id( value: Identifier ) {
    if (value.type!=='Identifier') throw new Error("FunctionDeclaration name can only be a valid id, but is "+JSON.stringify(value));
    this._id = Identifier.fromJson(value);
    this.checkAndLoadToStorage();
  }
  
  
  @Type(()=>Identifier) private _params: Array<Identifier>;
  
  get params(): Array<Identifier> {
    return this._params;
  }
  
  set params( value: Array<Identifier> ) {
    if (!_.isArray(value)) throw new Error("Parameters to a function must be an array of valid identifiers, but is "+JSON.stringify(value));
    this._params = _.isEmpty(value)?[]:_.reduce(value, ( paramsSoFar, param ) => {
      if (param.type=='Identifier'){
        return [...paramsSoFar, Identifier.fromJson(param)];
      } else {
        // TODO: Add how to deal with object and array destructuring
        throw new Error("Expecting basic function parameters, does not work with object/array destructuring, issue param="+JSON.stringify(param));
      }
    }, []);
    this.checkAndLoadToStorage();
  }
  
  @Type(() => NodeExpression, {
    discriminator: {
      property: "type",
      subTypes: [
        { value: Literal, name: "Literal" },
        { value: ArrayExpression, name: "ArrayExpression" },
        { value: ObjectExpression, name: "ObjectExpression" }
      ]
    }
  }) private _defaults: Array<Literal | ArrayExpression | ObjectExpression>;
  get defaults(): Array<Literal | ArrayExpression | ObjectExpression> {
    return this._defaults;
  }
  
  set defaults( value: Array<Literal | ArrayExpression | ObjectExpression> ) {
    if (!_.isArray(value)) throw new Error("defaults to a function must be an array of valid literals or arrays or objects, but is "+JSON.stringify(value));
    this._defaults = _.isEmpty(value)?[]:_.reduce(value, ( defaultsSoFar, defaultValue ) => {
      if (defaultValue.type=='Literal'){
        return [...defaultsSoFar, Literal.fromJson(defaultValue)];
      // } else if (defaultValue.type=='ArrayExpression'){
      //   return [...defaultsSoFar, ArrayExpression.fromJson(defaultValue)];
      // } else if (defaultValue.type=='ObjectExpression'){
      //   return [...defaultsSoFar, ObjectExpression.fromJson(defaultValue)];
      } else {
        // TODO: Add how to deal with object and array destructuring
        throw new Error("Expecting defaults to function parameters to be either literal or array or object, but is "+JSON.stringify(defaultValue));
      }
    }, []);
  }
  
  
  @Type(()=>BlockStatement) private _body: BlockStatement;
  get body(): BlockStatement {
    return this._body;
  }
  
  set body( value: BlockStatement ) {
    if (value.type!=='BlockStatement') throw new Error('Expecting Function Declaration body to be a block statement, but is '+JSON.stringify(value));
    this._body = BlockStatement.fromJson(value);
    this.checkAndLoadToStorage();
  }
  
  
  generator: boolean;
  expression: boolean;
  
  static fromJson(value): FunctionDeclaration {
    return plainToClass(FunctionDeclaration, value);
  }
  
  private checkAndLoadToStorage(): void {
    if (!this.id || !this.params || !this.body) return;
    if (this.id instanceof Identifier){
      IdentifierStorage.setIdentifierValue(this.id, this);
    } else {
      throw new Error("FunctionDeclaration name must be a valid identifier, but is "+JSON.stringify(this.id));
    }
  }
}
