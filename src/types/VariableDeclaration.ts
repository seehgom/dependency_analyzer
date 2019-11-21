import {Identifier} from './Identifier';
import {Literal} from './Literal';
import {VariableInitializationExpressionNode} from './VariableInitializationExpressionNode';
import { NodeExpression } from './NodeExpression';
import { Type } from 'class-transformer';
import { ObjectExpression } from './ObjectExpression';
import { FunctionExpression } from './FunctionExpression';
import { CallExpression } from './CallExpression';

type variableTypes = "var" | "let" | "const";
export class VariableDeclaration extends NodeExpression {
  type: "VariableDeclaration" = "VariableDeclaration";
  @Type(() => VariableDeclaration)
  declarations?: VariableDeclaration[];
  @Type(() => Identifier)
  kind?: variableTypes;
  @Type(() => Identifier)
  id?: Identifier;
  @Type(() => NodeExpression, {
    discriminator: {
      property: "type",
      subTypes: [
        { value: Literal, name: "Literal" },
        { value: ObjectExpression, name: "ObjectExpression" }
      ]
    }
  })
  init?: Literal | ObjectExpression;
  isInitalization(): boolean {
    return !!this.init;
  }
  isLiteralInitalization(): boolean {
    return this.isInitalization() && this.init instanceof Literal;
  }
}
