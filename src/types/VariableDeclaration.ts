import {Identifier} from './Identifier';
import {Literal} from './Literal';
import {VariableDeclarator} from './VariableDeclarator';
import { NodeExpression } from './NodeExpression';
import { plainToClass, Type } from 'class-transformer';
import { ObjectExpression } from './ObjectExpression';
import { FunctionExpression } from './FunctionExpression';
import { CallExpression } from './CallExpression';
import * as _ from 'lodash';

const variableTypes = ["var","let","const"];
export class VariableDeclaration extends NodeExpression {
  type: "VariableDeclaration" = "VariableDeclaration";
  @Type(() => VariableDeclarator) private _declarations?: VariableDeclarator[];
  
  get declarations(): VariableDeclarator[] {
    return this._declarations;
  }
  
  set declarations( value: VariableDeclarator[] ) {
    if (_.isNil(value)) {
      this._declarations = value;
    } else if (!_.isArray(value)) {
      throw new Error("In VariableDeclaration declarations must be undefined or an array of VariableDeclarator, but is "+JSON.stringify(value));
    } else {
      this._declarations = _.reduce(value, (declarationsSoFar, declaration)=>{
        if (declaration.type=="VariableDeclarator"){
          return [...declarationsSoFar, VariableDeclarator.fromJson(declaration)];
        } else {
          throw new Error("VariableDeclaration's declaration property can only contain other VariableDeclarator which are initializations, but is "+JSON.stringify(declaration));
        }
      }, []);
    }
    
  }
  
  private _kind?: string;
  
  get kind(): string {
    return this._kind;
  }
  
  set kind( value: string ) {
    if (_.isNil(value)) this._kind = value;
    if (!variableTypes.includes(value)) throw new Error("VariableDeclaration kind can be undefined when initializing the variable or should be either var, let or const, but is "+JSON.stringify(value));
    this._kind = value;
  }
  
  
  static fromJson( value ) {
    return plainToClass(VariableDeclaration, value);
  }
}
