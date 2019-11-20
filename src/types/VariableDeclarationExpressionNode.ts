import {IdentifierExpressionNode} from './IdentifierExpressionNode';
import {LiteralExpressionNode} from './LiteralExpressionNode';
import {VariableInitializationExpressionNode} from './VariableInitializationExpressionNode';
import { NodeExpression } from './NodeExpression';
import { Type } from 'class-transformer';

type variableTypes = "var" | "let" | "const";
export class VariableDeclarationExpressionNode extends NodeExpression {
  type: "VariableDeclaration" = "VariableDeclaration";
  @Type(() => VariableInitializationExpressionNode)
  declarations?: VariableInitializationExpressionNode[];
  @Type(() => IdentifierExpressionNode)
  kind?: variableTypes;
  @Type(() => IdentifierExpressionNode)
  id?: IdentifierExpressionNode;
  @Type(() => LiteralExpressionNode)
  init?: LiteralExpressionNode;
  isInitalization(): boolean {
    return !!this.init;
  }
}
