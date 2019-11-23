import {Literal} from './Literal';
import {Identifier} from './Identifier';
import { plainToClass, Type } from 'class-transformer';
import { NodeExpression } from './NodeExpression';
import { ObjectExpression } from './ObjectExpression';
import * as _ from 'lodash';

export class VariableDeclarator implements NodeExpression {
  type: "VariableDeclarator" = "VariableDeclarator";
  @Type(() => Identifier) private _id?: Identifier;
  
  get id(): Identifier {
    return this._id;
  }
  
  set id( value: Identifier ) {
    if (_.isNil(value) || value.type!=="Identifier") throw new Error("VariableDeclaration id can either be undefined or be an identifier but is "+JSON.stringify(value));
    this._id = Identifier.fromJson(value);
  }
  
  @Type(() => NodeExpression, {
    discriminator: {
      property: "type",
      subTypes: [
        { value: Literal, name: "Literal" },
        { value: ObjectExpression, name: "ObjectExpression" }
      ]
    }
  }) private _init?: Literal | ObjectExpression;
  
  get init(): Literal | ObjectExpression {
    return this._init;
  }
  
  set init( value: Literal | ObjectExpression ) {
    if (_.isNil(value)) throw new Error("VariableDeclarator's init property cannot be undefined, but is "+JSON.stringify(value));
    if (value.type=="Literal"){
      this._init = Literal.fromJson(value);
    } else if (value.type=="ObjectExpression") {
      this._init = ObjectExpression.fromJson(value);
    } else {
      throw new Error("VariableDeclaration init property can either be undefined, a literal or an object expression but is "+JSON.stringify(value));
    }
  }
  
  
  static fromJson(jsonData): VariableDeclarator {
    return plainToClass(VariableDeclarator, jsonData);
  }
  
  isInitalization(): boolean {
    return !!this._init;
  }
  isLiteralInitalization(): boolean {
    return this.isInitalization() && this._init instanceof Literal;
  }
}
