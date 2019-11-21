import { NodeExpression } from './NodeExpression';
import { VariableDeclaration } from './VariableDeclaration';
import { ExpressionStatement } from './ExpressionStatement';
import { plainToClass, Type } from 'class-transformer';
import { Literal } from './Literal';
import { Identifier } from './Identifier';
import { FunctionExpression } from './FunctionExpression';
import { CallExpression } from './CallExpression';

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
  })
  body!: VariableDeclaration[] | ExpressionStatement[];
  sourceType!: "module" | "script";
  static fromJson(jsonData):ProgramNode{
    return plainToClass(ProgramNode, jsonData);
  }
}
