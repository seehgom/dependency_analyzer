import { Identifier } from '../types/Identifier';
import { Literal } from '../types/Literal';
import { ArrayExpression } from '../types/ArrayExpression';
import { ObjectExpression } from '../types/ObjectExpression';
import { FunctionExpression } from '../types/FunctionExpression';
import { FileImport } from '../types/FileImport';

export class IdentifierStorage {
  static map: Map<string, FileImport | Literal | Identifier | ArrayExpression | ObjectExpression | FunctionExpression>;
  static initialization(){
    this.map = new Map<string, FileImport | Literal | Identifier | ArrayExpression | ObjectExpression | FunctionExpression>();
  }
  static setIdentifierValue(id: Identifier, value: FileImport | Literal | Identifier | ArrayExpression | ObjectExpression | FunctionExpression){
    if (!(id instanceof Identifier)) {
      throw new Error("Error creating a new Variable with bad id/name expected and identifier, but is "+JSON.stringify(id));
    }
    if (!(value instanceof FileImport || value instanceof Literal || value instanceof Identifier || value instanceof ArrayExpression || value instanceof ObjectExpression || value instanceof FunctionExpression)) {
      throw new Error("Error creating a Variable, expected a valid value but got "+JSON.stringify(value));
    }
    this.map.set(id.name, value);
  }
  static getIdentifierValue(id: Identifier): FileImport | Literal | Identifier | ArrayExpression | ObjectExpression | FunctionExpression {
    if (id.type!=='Identifier') throw new Error("Can only get a value for a Variable, but got id as "+JSON.stringify(id));
    return this.map.get(id.name);
  }
}
IdentifierStorage.initialization();
