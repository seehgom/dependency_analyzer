import {CallExpression} from './CallExpression';
import {Identifier} from './Identifier';
import { NodeExpression } from './NodeExpression';
import { plainToClass, Type } from 'class-transformer';

export class MemberExpression extends NodeExpression {
  type: "MemberExpression" = "MemberExpression";
  computed?: boolean;
  @Type(() => NodeExpression, {
    discriminator: {
      property: "type",
      subTypes: [
        { value: Identifier, name: "Identifier" },
        { value: CallExpression, name: "CallExpression" }
      ]
    }
  }) private _object!: CallExpression | Identifier;
  @Type(() => Identifier) private _property!: Identifier;
  
  
  get property(): Identifier {
    return this._property;
  }
  
  set property( value: Identifier ) {
    if (value.type!=="Identifier") throw new Error("MemberExpression's property must be an identifier, but is "+JSON.stringify(value));
    this._property = Identifier.fromJson(value);
  }
  
  get object(): CallExpression | Identifier {
    return this._object;
  }
  
  set object( value: CallExpression | Identifier ) {
    debugger;
    if (value.type == "CallExpression") {
      this._object = CallExpression.fromJson(value);
    } else if(value.type == "Identifier") {
      this._object = Identifier.fromJson(value);
    } else {
      throw new Error("Wrong type of object property passed, but is "+JSON.stringify(value));
    }
  }
  
  constructor( type: "MemberExpression", computed: boolean, object: CallExpression | Identifier, property: Identifier ) {
    super();
    debugger;
    this.type = "MemberExpression";
    this.computed = computed;
    this._object = object;
    this._property = property;
  }
  
  static fromJson(jsonData): MemberExpression {
    return plainToClass(MemberExpression, jsonData);
  }
  
  isAngularJSModuleDeclaration(): boolean {
    if(this._property.type == "Identifier" && this._property.name == "module" &&  this._object.getParent() == "angular"){
      return true;
    }
    return false;
  }
  
  isAngularJSComponentDeclaration(): boolean {
    if(this._property.type == "Identifier" && this._property.name == "controller" && this._object.getParent() == "angular"){
      return true;
    }
    return false;
  }
  
  getParent(): string | false {
    if(this._object instanceof Identifier) {
      return this._object.name;
    } else {
      return this._object.getParent();
    }
  }
  
  isRootMemberExpression() {
    return this._object.type == "Identifier";
  }
}
