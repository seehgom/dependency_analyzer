import {CallExpressionNode} from './CallExpressionNode';
import { NodeExpression } from './NodeExpression';
export class ExpressionStatementNode implements NodeExpression {
  type: "ExpressionStatement" = "ExpressionStatement";
  expression!: CallExpressionNode;
}
