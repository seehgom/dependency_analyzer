import { Identifier } from '../types/Identifier';
import { Literal } from '../types/Literal';
import { ArrayExpression } from '../types/ArrayExpression';
import { ObjectExpression } from '../types/ObjectExpression';
import { FunctionExpression } from '../types/FunctionExpression';

export class IdentifierStorage {
  static map: Map<string, Literal | Identifier | ArrayExpression | ObjectExpression | FunctionExpression>;
  static initialization(){
    this.map = new Map<string, Literal | Identifier | ArrayExpression | ObjectExpression | FunctionExpression>();
  }
  static store(id: Identifier, value: Literal | Identifier | ArrayExpression | ObjectExpression | FunctionExpression){
    if (!(id instanceof Identifier)) {
      throw new Error("Error creating a new Variable with bad id/name expected and identifier, but is "+JSON.stringify(id));
    }
    if (!(value instanceof Literal || value instanceof Identifier || value instanceof ArrayExpression || value instanceof ObjectExpression || value instanceof FunctionExpression)) {
      throw new Error("Error creating a Variable, expected a valid value but got "+JSON.stringify(value));
    }
    this.map.set(id.name, value);
  }
}
IdentifierStorage.initialization();
