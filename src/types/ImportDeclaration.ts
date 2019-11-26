import { ImportDefaultSpecifier } from './ImportDefaultSpecifier';
import { Type } from 'class-transformer';
import * as _ from 'lodash';
import { Literal } from './Literal';
import { FileImport } from './FileImport';
import { IdentifierStorage } from '../uitility/IdentifierStorage';
export class ImportDeclaration {
  type: "ImportDeclaration" = "ImportDeclaration";
  @Type(()=> ImportDefaultSpecifier) private _specifiers: ImportDefaultSpecifier[];
  
  get specifiers(): ImportDefaultSpecifier[] {
    return this._specifiers;
  }
  
  set specifiers( value: ImportDefaultSpecifier[] ) {
    if (_.isNil(value) || !_.isArray(value) || (_.isArray(value) && _.isEmpty(value))) throw new Error("Specifiers property in Import statement must be a list/array of Import specifier, but is "+JSON.stringify(value));
    this._specifiers = _.reduce(value, (importSpecifiersSoFar, importId)=>{
      if (importId.type=="ImportDefaultSpecifier"){
        return [...importSpecifiersSoFar, ImportDefaultSpecifier.fromJson(importId)];
      } else {
        throw new Error("Specifiers property in Import statement must be a list/array of Import specifier, but is "+JSON.stringify(importId));
      }
    }, []);
    this.checkAndLoadToStorage();
  }
  @Type(()=>Literal) private _source: Literal;
  
  get source(): Literal {
    return this._source;
  }
  
  set source( value: Literal ) {
    if (value.type!=='Literal') throw new Error("Import source value must be a string literal, but is "+JSON.stringify(value));
    this._source = Literal.fromJson(value);
    this.checkAndLoadToStorage();
  }
  private checkAndLoadToStorage(): void {
    if (!this._source || !this._specifiers) return;
    if(this._specifiers.length == 1){
        IdentifierStorage.setIdentifierValue(this._specifiers[0].local, new FileImport(this._source.value));
    }
  }
}
