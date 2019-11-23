import { NodeExpression } from './NodeExpression';
import { Identifier } from './Identifier';
import { plainToClass } from 'class-transformer';

export class ObjectExpression extends NodeExpression {
  type: "ObjectExpression" = "ObjectExpression";
  properties: any[];
  
  static fromJson( value ) {
    return plainToClass(ObjectExpression, value);
  }
}
