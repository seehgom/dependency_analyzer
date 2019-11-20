import {CallExpressionNode} from './CallExpressionNode';
import { NodeExpression } from './NodeExpression';
export class ExpressionStatement implements NodeExpression {
  type: "ExpressionStatement" = "ExpressionStatement";
  expression!: CallExpressionNode;
}
