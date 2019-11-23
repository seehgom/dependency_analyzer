import {BlockStatement} from './BlockStatement';
import {Identifier} from './Identifier';
import { NodeExpression } from './NodeExpression';
import { plainToClass, Type } from 'class-transformer';
export class FunctionExpression implements NodeExpression {
  type: "FunctionExpression" = "FunctionExpression";
  id = null
  params!: any[];
  defaults: any[];
  @Type(()=>BlockStatement) private _body: BlockStatement;
  
  get body(): BlockStatement {
    return this._body;
  }
  
  set body( value: BlockStatement ) {
    if (value.type!=="BlockStatement") throw new Error("FunctionExpression's body must be a BlockStatement, but is "+JSON.stringify(value));
    this._body = BlockStatement.fromJson(value);
  }
  
  generator = false;
  expression = false;
  
  static fromJson( jsonData ): FunctionExpression {
    return plainToClass(FunctionExpression, jsonData);
  }
}
