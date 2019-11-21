import {MemberExpression} from './MemberExpression';
import {Identifier} from './Identifier';
import {Literal} from './Literal';
import {ArrayExpression} from './ArrayExpression';
import {FunctionExpression} from './FunctionExpression';
import { NodeExpression } from './NodeExpression';
import { plainToClass, Type } from 'class-transformer';
export class CallExpression extends NodeExpression {
  type: "CallExpression" = "CallExpression";
  @Type(() => NodeExpression, {
    discriminator: {
      property: "type",
      subTypes: [
        { value: Identifier, name: "Identifier" },
        { value: MemberExpression, name: "MemberExpression" }
      ]
    }
  })
  callee!: MemberExpression | Identifier;
  @Type(() => NodeExpression, {
    discriminator: {
      property: "type",
      subTypes: [
        { value: Literal, name: "Literal" },
        { value: Identifier, name: "Identifier" },
        { value: FunctionExpression, name: "FunctionExpression" },
        { value: CallExpression, name: "CallExpression" },
        { value: ArrayExpression, name: "ArrayExpression" }
      ]
    }
  })
  arguments!: [Identifier | Literal, ArrayExpression |CallExpression | FunctionExpression ];
  
  
  getParent(): string {
    if(this.callee instanceof Identifier){
      return this.callee.name;
    } else {
      return this.callee.getParent();
    }
  }
  isRootCallExpression(): boolean {
    return this.callee.isRootMemberExpression();
  }
  getParentModule(): Identifier | Literal | boolean {
    if(this.callee instanceof Identifier){
      return false;
    } else if (this.isRootCallExpression()) {
      return this.arguments[0];
    } else {
      return this.callee instanceof MemberExpression && this.callee.object instanceof CallExpression
        ? this.callee.object.getParentModule()
        : false;
    }
  }
  isAngularJSModuleDeclaration(): boolean {
    return this.callee.isAngularJSModuleDeclaration();
  }
  getAngularJSModuleName(): Identifier | Literal | boolean {
    if(this.isAngularJSModuleDeclaration()){
      return this.arguments[0];
    }
    return false;
  }
  isAngularJSControllerDeclaration(): boolean {
    return this.callee.isAngularJSControllerDeclaration();
  }
  getAngularJSControllerName(): Identifier | Literal | boolean {
    if(this.isAngularJSControllerDeclaration()){
      return this.arguments[0];
    }
    return false;
  }
  
  static fromJson( jsonData ): CallExpression {
    return plainToClass(CallExpression, jsonData);
  }
}
