import { NodeExpression } from './NodeExpression';
import { Identifier } from './Identifier';

export class ObjectExpression extends NodeExpression {
  type: "ObjectExpression" = "ObjectExpression";
  properties: any[];
}
