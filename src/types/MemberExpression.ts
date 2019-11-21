import {CallExpression} from './CallExpression';
import {Identifier} from './Identifier';
import { NodeExpression } from './NodeExpression';
import { plainToClass, Type } from 'class-transformer';
import { UtilityFunctions } from '../utility/UtilityFunctions';

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
  @Type(() => Identifier)
  property!: Identifier;
  
  
  get object(): CallExpression | Identifier {
    return this._object;
  }
  
  set object( value: CallExpression | Identifier ) {
    debugger;
    if (value.type == "CallExpression") {
      this._object = UtilityFunctions.fromJson<CallExpression>(value);
    } else if(value.type == "Identifier") {
      this._object = UtilityFunctions.fromJson<Identifier>(value);
    } else {
      throw new Error("Wrong type of object property passed");
    }
  }
  
  constructor( type: "MemberExpression", computed: boolean, object: CallExpression | Identifier, property: Identifier ) {
    super();
    debugger;
    this.type = "MemberExpression";
    this.computed = computed;
    this._object = object;
    this.property = property;
  }
  
  static fromJson(jsonData): MemberExpression {
    return plainToClass(MemberExpression, jsonData);
  }
  
  isAngularJSModuleDeclaration(): boolean {
    if(this.property.type == "Identifier" && this.property.name == "module" &&  this._object.getParent() == "angular"){
      return true;
    }
    return false;
  }
  
  isAngularJSControllerDeclaration(): boolean {
    if(this.property.type == "Identifier" && this.property.name == "controller" && this._object.getParent() == "angular"){
      return true;
    }
    return false;
  }
  
  getParent(): string {
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
