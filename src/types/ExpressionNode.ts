export class ExpressionNode {
  name!: string;
  type!:
    | "Identifier"
    | "Literal"
    | "VariableDeclarator"
    | "MemberExpression"
    | "ArrayExpression"
    | "CallExpression";
  raw?: string;
  id?: ExpressionNode;
  init?: ExpressionNode;
  kind?: string;
  declarations?: ExpressionNode[];
  // object?: ExpressionNode;
  // property?: ExpressionNode;
  elements?: any[];
  // callee:
  getParent():string {
    return this.name;
  }
}
