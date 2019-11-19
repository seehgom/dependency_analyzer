import {ExpressionStatement} from './ExpressionStatement';
export class BlockStatement {
  type!: "BlockStatement"
  body!: ExpressionStatement[]
}
