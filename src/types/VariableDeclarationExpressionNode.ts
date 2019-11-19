import {IdentifierExpressionNode} from './IdentifierExpressionNode';
import {LiteralExpressionNode} from './LiteralExpressionNode';
import {VariableInitializationExpressionNode} from './VariableInitializationExpressionNode';
export class VariableDeclarationExpressionNode {
  type!: "VariableDeclaration"
  declarations!: VariableInitializationExpressionNode[] | IdentifierExpressionNode[];
  kind!: "var" | "let" | "const";
}
