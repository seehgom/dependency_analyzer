import * as _ from 'lodash';
import { VariableDeclaration } from '../types/VariableDeclaration';
import { ExpressionNode } from '../types/ExpressionNode';
import { ArrayExpression } from '../types/ArrayExpression';
import { CallExpression } from '../types/CallExpression';
import { ExpressionStatement } from '../types/ExpressionStatement';
import { FunctionExpression } from '../types/FunctionExpression';
import { Identifier } from '../types/Identifier';
import { Literal } from '../types/Literal';
import { MemberExpression } from '../types/MemberExpression';
import { NodeExpression } from '../types/NodeExpression';
import { ObjectExpression } from '../types/ObjectExpression';
import { ProgramNode } from '../types/ProgramNode';
import { BlockStatement } from '../types/BlockStatement';
import { plainToClass } from 'class-transformer';

export class UtilityFunctions {
  static classes = {
    "ArrayExpression": ArrayExpression,
    "BlockStatement": BlockStatement,
    "CallExpression": CallExpression,
    "any": ExpressionNode,
    "ExpressionStatement": ExpressionStatement,
    "FunctionExpression": FunctionExpression,
    "Identifier": Identifier,
    "Literal": Literal,
    "MemberExpression": MemberExpression,
    "NodeExpression": NodeExpression,
    "ObjectExpression":ObjectExpression,
    "ProgramNode":ProgramNode,
    "VariableDeclaration": VariableDeclaration
  };
  static getClass({type}){
    return UtilityFunctions.classes[type];
  }
  static fromJson<Clazz>(jsonData): Clazz {
    if (!jsonData.type) throw Error("Can't have a node without type property");
    const typeOfObject = jsonData.type;
    const ClassToApply = UtilityFunctions.getClass(jsonData);
    return <Clazz><any>plainToClass(ClassToApply, jsonData);
  }
}
