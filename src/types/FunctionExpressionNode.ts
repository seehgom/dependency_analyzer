import {BlockStatement} from './BlockStatement';
import {IdentifierExpressionNode} from './IdentifierExpressionNode';
import { NodeExpression } from './NodeExpression';
export class FunctionExpressionNode implements NodeExpression {
  type: "FunctionExpression" = "FunctionExpression";
  id = null
  params!: IdentifierExpressionNode[]
  defaults: any[]
  body: BlockStatement
  generator = false
  expression = false
}
