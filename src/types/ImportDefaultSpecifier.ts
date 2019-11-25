import { Identifier } from './Identifier';
import { plainToClass, Type } from 'class-transformer';

export class ImportDefaultSpecifier {
  type: "ImportDefaultSpecifier" = "ImportDefaultSpecifier";
  @Type(()=> Identifier) private _local: Identifier;
  
  get local(): Identifier {
    return this._local;
  }
  
  set local( value: Identifier ) {
    if (value.type!=='Identifier') throw new Error("Import statement's local property must be of Identifier/variable name type, but is "+JSON.stringify(value));
    this._local = Identifier.fromJson(value);
  }
  
  static fromJson(value): ImportDefaultSpecifier {
    return plainToClass(ImportDefaultSpecifier, value);
  }
}
