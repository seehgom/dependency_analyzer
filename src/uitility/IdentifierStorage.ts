import { Identifier } from '../types/Identifier';
import { Literal } from '../types/Literal';
import { ArrayExpression } from '../types/ArrayExpression';
import { ObjectExpression } from '../types/ObjectExpression';
import { FunctionExpression } from '../types/FunctionExpression';
import { FileImport } from '../types/FileImport';
import * as _ from 'lodash';
import { CallExpression } from '../types/CallExpression';

export class IdentifierStorage {
  static map: Map<string, FileImport | Literal | Identifier | ArrayExpression | ObjectExpression | FunctionExpression | CallExpression>;
  static mapHolder: any;
  static context: string;
  static initializeContext(cont: string | Map<string, any>){
    if(_.isString(cont)){
      // if(!IdentifierStorage.mapHolder) {
      //   IdentifierStorage.mapHolder = {[IdentifierStorage.context]: IdentifierStorage.map};
      // } else {
      //   IdentifierStorage.mapHolder[IdentifierStorage.context] = IdentifierStorage.map;
      // }
      if(IdentifierStorage.context){
        if(IdentifierStorage.context == cont) {
          return;
        } else {
          IdentifierStorage.mapHolder[IdentifierStorage.context] = IdentifierStorage.map;
        }
        if(cont in IdentifierStorage.mapHolder){
          IdentifierStorage.context = cont;
          IdentifierStorage.map = IdentifierStorage.mapHolder[cont];
          return;
        }
      }
      IdentifierStorage.context = cont;
      IdentifierStorage.map = new Map<string, FileImport | Literal | Identifier | ArrayExpression | ObjectExpression | FunctionExpression | CallExpression>();
  
      if(!IdentifierStorage.mapHolder) {
        IdentifierStorage.mapHolder = {[IdentifierStorage.context]: IdentifierStorage.map};
      } else {
        IdentifierStorage.mapHolder[IdentifierStorage.context] = IdentifierStorage.map;
      }
    } else {
      if(!IdentifierStorage.mapHolder) {
        IdentifierStorage.mapHolder = {[IdentifierStorage.context]: IdentifierStorage.map};
      } else {
        IdentifierStorage.mapHolder[IdentifierStorage.context] = IdentifierStorage.map;
      }
      IdentifierStorage.context = "external";
      IdentifierStorage.map = cont;
    }
    
  }
  static setIdentifierValue(id: Identifier, value: FileImport | Literal | Identifier | ArrayExpression | ObjectExpression | FunctionExpression | CallExpression){
    if(!IdentifierStorage.context || !IdentifierStorage.map) throw new Error("Context must be initialized");
    if (!(id instanceof Identifier)) {
      throw new Error("Error creating a new Variable with bad id/name expected and identifier, but is "+JSON.stringify(id));
    }
    if (!(value instanceof FileImport || value instanceof Literal || value instanceof Identifier || value instanceof ArrayExpression || value instanceof ObjectExpression || value instanceof FunctionExpression)) {
      throw new Error("Error creating a Variable, expected a valid value but got "+JSON.stringify(value));
    }
    IdentifierStorage.map.set(id.name, value);
  }
  static getIdentifierValue(id: Identifier): FileImport | Literal | Identifier | ArrayExpression | ObjectExpression | FunctionExpression | CallExpression {
    if(!IdentifierStorage.context || !IdentifierStorage.map) throw new Error("Context must be initialized");
    if (id.type!=='Identifier') throw new Error("Can only get a value for a Variable, but got id as "+JSON.stringify(id));
    return IdentifierStorage.map.get(id.name);
  }
}
// IdentifierStorage.initialization();
