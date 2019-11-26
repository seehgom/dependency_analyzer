import { MemberExpression } from "./MemberExpression";
import { Identifier } from "./Identifier";
import { Literal } from "./Literal";
import { ArrayExpression } from "./ArrayExpression";
import { FunctionExpression } from "./FunctionExpression";
import { NodeExpression } from "./NodeExpression";
import { plainToClass, Type } from "class-transformer";
import * as _ from "lodash";
import { FileImport } from "./FileImport";
export class CallExpression extends NodeExpression {
  type: "CallExpression" = "CallExpression";
  @Type(() => NodeExpression, {
    discriminator: {
      property: "type",
      subTypes: [
        { value: Identifier, name: "Identifier" },
        { value: MemberExpression, name: "MemberExpression" },
        { value: FunctionExpression, name: "FunctionExpression" }
      ]
    }
  })
  private _callee!: MemberExpression | Identifier | FunctionExpression;

  get callee(): MemberExpression | Identifier | FunctionExpression {
    return this._callee;
  }

  set callee(value: MemberExpression | Identifier | FunctionExpression) {
    if (_.isNil(value))
      throw new Error(
        "CallExpression's callee cannot be undefined, but is " + JSON.stringify(value)
      );
    if (value.type == "MemberExpression") {
      this._callee = MemberExpression.fromJson(value);
    } else if (value.type == "Identifier") {
      this._callee = Identifier.fromJson(value);
    } else if (value.type == "FunctionExpression") {
      this._callee = FunctionExpression.fromJson(value);
    } else {
      throw new Error(
        "Can only call a function object or object method or function definition, but is " +
          JSON.stringify(value)
      );
    }
  }

  arguments!: any[];

  getParent(): string | false {
    if (this._callee instanceof Identifier) {
      return this._callee.name;
    } else if (this._callee instanceof FunctionExpression) {
      return false;
    } else {
      return this._callee.getParent();
    }
  }
  isRootCallExpression(): boolean {
    if (this._callee instanceof FunctionExpression) return true;
    return this._callee.isRootMemberExpression();
  }
  getParentModule(): Identifier | Literal | boolean {
    if (this._callee instanceof Identifier) {
      return false;
    } else if (this.isRootCallExpression()) {
      return this.arguments[0];
    } else {
      return this._callee instanceof MemberExpression &&
        this._callee.object instanceof CallExpression
        ? this._callee.object.getParentModule()
        : false;
    }
  }
  isAngularJSModuleDeclaration(): boolean {
    if (
      this._callee.type !== "MemberExpression" ||
      !this.isAngularJSComponentModuleName(this.arguments[0]) ||
      !this.isAngularJSModuleDeps(this.arguments[1])
    )
      return false;
    return this._callee.isAngularJSModuleDeclaration();
  }
  getAngularJSModuleName(): Identifier | Literal | boolean {
    if (this.isAngularJSModuleDeclaration()) {
      return this.arguments[0];
    }
    return false;
  }
  isAngularJSModuleDeps(value) {
    if (_.isNil(value)) {
      return true;
    } else if (value.type !== "ArrayExpression") {
      return false;
    } else {
      const dependencyArray = ArrayExpression.fromJson(value);
      return dependencyArray.canBeAngularJSModuleDeps;
    }
  }
  isAngularJSComponentModuleName(value): boolean {
    if (_.isNil(value)) return false;
    return ["Identifier", "Literal"].includes(value.type);
  }
  isAngularJSComponentBody(value): boolean {
    if (_.isNil(value)) return false;
    return ["ArrayExpression", "CallExpression", "FunctionExpression"].includes(
      value.type
    );
  }
  isAngularJSComponentDeclaration(): boolean {
    if (
      this._callee.type !== "MemberExpression" ||
      !this.isAngularJSComponentArguments(this.arguments)
    )
      return false;
    return this._callee.isAngularJSComponentDeclaration();
  }
  isAngularJSComponentArguments(value): boolean {
    if (
      !_.isArray(value) ||
      _.isEmpty(value) ||
      value.length !== 2 ||
      !this.isAngularJSComponentModuleName(value[0]) ||
      !this.isAngularJSComponentBody(value[1])
    )
      return false;
    return true;
  }
  getAngularJSComponentName(): Identifier | Literal | boolean {
    if (this.isAngularJSComponentDeclaration()) {
      const possibleCtrlName = this.arguments[0];
      if (possibleCtrlName.type == "Identifier") {
        return Identifier.fromJson(this.arguments[0]);
      } else if (possibleCtrlName.type == "Literal") {
        return Literal.fromJson(this.arguments[0]);
      } else {
        throw new Error(
          "AngularJS Component can only be a string literal or variable with value as a string, but is " +
            JSON.stringify(this.arguments[0])
        );
      }
    }
    return false;
  }

  isRequireStatment(): boolean {
    return this._callee instanceof Identifier && this._callee.name == "require" && this.arguments.length===1 && (this.arguments[0].type=="Literal" || this.arguments[0].type=="Identifier");
  }

  getFileImport(): FileImport {
      if(this.isRequireStatment()){
           const sourceArg = this.arguments[0];
          if(sourceArg.type=="Literal"){
              const literalObj = Literal.fromJson(sourceArg);
              return new FileImport(literalObj.value);
          } else if(sourceArg.type=="Identifier"){
                const identifierLiteralValueObj = Identifier.fromJson(sourceArg).getValue();
                if(identifierLiteralValueObj instanceof Literal){
                    return new FileImport(identifierLiteralValueObj.value);
                }
          }
          throw new Error("require can only take string as input, but is "+JSON.stringify(sourceArg));
      }
      throw new Error("Can get import information only on import or require statements, but asked for "+JSON.stringify(this));
  }

  static fromJson(jsonData): CallExpression {
    return plainToClass(CallExpression, jsonData);
  }
}
