import {FunctionExpressionNode} from './FunctionExpressionNode';
import {LiteralExpressionNode} from './LiteralExpressionNode';
import {IdentifierExpressionNode} from './IdentifierExpressionNode';
import {CallExpressionNode} from './CallExpressionNode';
export class ArrayExpression {
  type!: "ArrayExpression";
  elements: [LiteralExpressionNode | IdentifierExpressionNode,  FunctionExpressionNode | IdentifierExpressionNode | CallExpressionNode ]
}
