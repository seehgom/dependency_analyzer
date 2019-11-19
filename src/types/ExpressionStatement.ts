import {CallExpressionNode} from './CallExpressionNode';
export class ExpressionStatement {
  type!: "ExpressionStatement"
  expression!: CallExpressionNode
}
