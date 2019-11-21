import {FunctionExpression} from './FunctionExpression';
import {Literal} from './Literal';
import {Identifier} from './Identifier';
import {CallExpression} from './CallExpression';
import { plainToClass, Type } from 'class-transformer';
import { NodeExpression } from './NodeExpression';
import * as _ from 'lodash';
export class ArrayExpression implements NodeExpression {
  type: "ArrayExpression" = "ArrayExpression";
  @Type(() => NodeExpression, {
    discriminator: {
      property: "type",
      subTypes: [
        { value: Literal, name: "Literal" },
        { value: Identifier, name: "Identifier" },
        { value: FunctionExpression, name: "FunctionExpression" },
        { value: CallExpression, name: "CallExpression" }
      ]
    }
  }) private _elements: [] | [Literal | Identifier,  FunctionExpression | Identifier | CallExpression ];
  
  
  get elements(): [] | [(Literal | Identifier), (FunctionExpression | Identifier | CallExpression)] {
    return this._elements;
  }
  
  set elements( value: [] | [(Literal | Identifier), (FunctionExpression | Identifier | CallExpression)] ) {
    debugger;
    if (_.isEmpty(value)){
      this._elements = [];
      return;
    }
    const Id = value[0];
    const Main = value[1];
    if (!Id || !Main){
      this._elements = [];
    }
    if (Id.type=="Literal"){
      this._id = Literal.fromJson(Id);
    } else if (Id.type=="Identifier") {
      this._id = Identifier.fromJson(Id);
    } else {
      this._id = null;
    }
    if (Main.type=="FunctionExpression"){
      this._main = FunctionExpression.fromJson(Main);
    } else if (Main.type == "Identifier"){
      this._main = Identifier.fromJson(Main);
    } else if (Main.type=="CallExpression"){
      this._main = CallExpression.fromJson(Main);
    } else {
      this._main = null;
    }
    this._elements = [this._id, this._main];
  }
  
  _id: (Literal | Identifier);
  _main: (FunctionExpression | Identifier | CallExpression);
  
  
  static fromJson(jsonData): ArrayExpression {
    return plainToClass(ArrayExpression, jsonData)
  }
  
  constructor( type: "ArrayExpression", elements: [(Literal | Identifier), (FunctionExpression | Identifier | CallExpression)] ) {
    this.type = "ArrayExpression";
    this._elements = elements;
  }
}
