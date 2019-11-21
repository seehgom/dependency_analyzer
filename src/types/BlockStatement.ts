import { NodeExpression } from './NodeExpression';
import { ExpressionStatement } from './ExpressionStatement';
import { plainToClass, Type } from 'class-transformer';
import * as _ from 'lodash';
export class BlockStatement implements NodeExpression {
  type: "BlockStatement" = "BlockStatement";
  @Type(()=>ExpressionStatement) private _body!: ExpressionStatement[];
  
  get body(): ExpressionStatement[] {
    return this._body;
  }
  
  set body( value: ExpressionStatement[] ) {
    this._body = _.isEmpty(value)?[]:_.reduce(value, (bodySoFar, nextStatement)=>{
      if (nextStatement.type=="ExpressionStatement"){
        return [...bodySoFar, ExpressionStatement.fromJson(nextStatement)];
      } else {
        return bodySoFar;
      }
    }, []);
  }
  
  constructor( type: "BlockStatement", body: ExpressionStatement[] ) {
    this.type = "BlockStatement";
    this._body = body;
  }
  
  static fromJson( jsonData ) {
    return plainToClass(BlockStatement, jsonData);
  }
}
