import {ExpressionStatement} from './ExpressionStatement';
import { NodeExpression } from './NodeExpression';
export class BlockStatement implements NodeExpression {
  type!: "BlockStatement";
  body!: ExpressionStatement[];
  
  constructor( type: "BlockStatement", body: ExpressionStatement[] ) {
    this.type = "BlockStatement";
    this.body = body;
  }
}
