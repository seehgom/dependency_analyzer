import {BlockStatement} from './BlockStatement';
import {IdentifierExpressionNode} from './IdentifierExpressionNode';
export class FunctionExpressionNode {
  type!: "FunctionExpression"
  id = null
  params!: IdentifierExpressionNode[]
  defaults: any[]
  body: BlockStatement
  generator = false
  expression = false
}
