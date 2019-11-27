import { Identifier } from '../types/Identifier';
import { Literal } from '../types/Literal';
import { ArrayExpression } from '../types/ArrayExpression';
import { ObjectExpression } from '../types/ObjectExpression';
import { FunctionExpression } from '../types/FunctionExpression';
import { FileImport } from '../types/FileImport';

export class IdentifierStorage {
  static map: Map<string, FileImport | Literal | Identifier | ArrayExpression | ObjectExpression | FunctionExpression>;
  static mapHolder: any;
  static context: string;
  static initializeContext(cont: string){
    if(this.context){
      if(this.context == cont) {
        return;
      } else {
        this.mapHolder[this.context] = this.map;
      }
      if(cont in this.mapHolder){
        this.context = cont;
        this.map = this.mapHolder[cont];
        return;
      }
    }
    this.context = cont;
    this.map = new Map<string, FileImport | Literal | Identifier | ArrayExpression | ObjectExpression | FunctionExpression>();
    
    if(!this.mapHolder) {
      this.mapHolder = {[this.context]: this.map};
    } else {
      this.mapHolder[this.context] = this.map;
    }
  }
  static setIdentifierValue(id: Identifier, value: FileImport | Literal | Identifier | ArrayExpression | ObjectExpression | FunctionExpression){
    if(!this.context || !this.map) throw new Error("Context must be initialized");
    if (!(id instanceof Identifier)) {
      throw new Error("Error creating a new Variable with bad id/name expected and identifier, but is "+JSON.stringify(id));
    }
    if (!(value instanceof FileImport || value instanceof Literal || value instanceof Identifier || value instanceof ArrayExpression || value instanceof ObjectExpression || value instanceof FunctionExpression)) {
      throw new Error("Error creating a Variable, expected a valid value but got "+JSON.stringify(value));
    }
    this.map.set(id.name, value);
  }
  static getIdentifierValue(id: Identifier): FileImport | Literal | Identifier | ArrayExpression | ObjectExpression | FunctionExpression {
    if(!this.context || !this.map) throw new Error("Context must be initialized");
    if (id.type!=='Identifier') throw new Error("Can only get a value for a Variable, but got id as "+JSON.stringify(id));
    return this.map.get(id.name);
  }
}
// IdentifierStorage.initialization();
