import { NodeExpression } from './NodeExpression';
import { ExpressionStatementNode } from './ExpressionStatementNode';
export class BlockStatement implements NodeExpression {
  type: "BlockStatement" = "BlockStatement";
  body!: ExpressionStatementNode[];
  
  constructor( type: "BlockStatement", body: ExpressionStatementNode[] ) {
    this.type = "BlockStatement";
    this.body = body;
  }
}
