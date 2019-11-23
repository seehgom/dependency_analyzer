import { NodeExpression } from './NodeExpression';
import { VariableDeclaration } from './VariableDeclaration';
import { ExpressionStatement } from './ExpressionStatement';
import { plainToClass, Type } from 'class-transformer';
import { Literal } from './Literal';
import { Identifier } from './Identifier';
import { FunctionExpression } from './FunctionExpression';
import { CallExpression } from './CallExpression';
import * as _ from 'lodash';

export class ProgramNode extends NodeExpression {
  type: "Program" = "Program";
  @Type(() => NodeExpression, {
    discriminator: {
      property: "type",
      subTypes: [
        { value: VariableDeclaration, name: "VariableDeclaration" },
        { value: ExpressionStatement, name: "ExpressionStatement" }
      ]
    }
  }) private _body!: VariableDeclaration[] | ExpressionStatement[];
  
  get body(): VariableDeclaration[] | ExpressionStatement[] {
    return this._body;
  }
  
  set body( value: VariableDeclaration[] | ExpressionStatement[] ) {
    if (!_.isArray(value)) throw new Error("ProgramNode body must be an array, but is "+value);
    if (_.isEmpty(value)) this._body = [];
    this._body = _.reduce(value, (bodyOfStatementsSoFar, statement)=>{
      if (statement.type == "VariableDeclaration"){
        return [...bodyOfStatementsSoFar, VariableDeclaration.fromJson(statement)];
      } else if (statement.type == "ExpressionStatement"){
        return [...bodyOfStatementsSoFar, ExpressionStatement.fromJson(statement)]
      } else {
        throw new Error("Program cannot be anything but expression statements or variable declarations, but is "+JSON.stringify(statement));
      }
    }, []);
    
  }
  
  sourceType!: "module" | "script";
  static fromJson(jsonData):ProgramNode{
    return plainToClass(ProgramNode, jsonData);
  }
}
