import { FunctionExpression } from "./FunctionExpression";
import { Literal } from "./Literal";
import { Identifier } from "./Identifier";
import { CallExpression } from "./CallExpression";
import { plainToClass, Type } from "class-transformer";
import { NodeExpression } from "./NodeExpression";
import * as _ from "lodash";
export class ArrayExpression implements NodeExpression {
  type: "ArrayExpression" = "ArrayExpression";
  elements: any[];
  constructor(type: "ArrayExpression", elements: any[]) {
    this.type = "ArrayExpression";
    this.elements = elements;
  }

  canBeAngularJSModuleDeps(): boolean {
    if (_.isNil(this.elements) || !_.isArray(this.elements)) return false;
    if (_.isEmpty(this.elements)) return true;
    return _.reduce(
      this.elements,
      (isValidAngularJSDepSoFar, depName) => {
        if (depName.type !== "Literal" && depName.type !== "Identifier")
          isValidAngularJSDepSoFar = false;
        return isValidAngularJSDepSoFar;
      },
      true
    );
  }

  getAngularJSModuleDeps(): false | Identifier[] | Literal[] {
    if (!this.canBeAngularJSModuleDeps()) return false;
    if (_.isEmpty(this.elements)) return [];
    return _.reduce(
      this.elements,
      (dependenciesSofar, depName) => {
        if (depName.type == "Literal")
          return [...dependenciesSofar, Literal.fromJson(depName)];
        if (depName.type == "Identifier")
          return [...dependenciesSofar, Identifier.fromJson(depName)];
        throw new Error(
          "AngularJS Dependencies can be only be array containing string literals or variables with string as value, but is " +
            JSON.stringify(depName)
        );
      },
      []
    );
  }

  isisAngularJSComponentDepsBody(): boolean {
    if (
      _.isNil(this.elements) ||
      !_.isArray(this.elements) ||
      _.isEmpty(this.elements)
    )
      return false;
    const possibleFunctionDeclaration = _.last(this.elements);
    if (
      possibleFunctionDeclaration.type !== "Identifier" &&
      possibleFunctionDeclaration.type !== "FunctionExpression" &&
      possibleFunctionDeclaration.type !== "CallExpression"
    )
      return false;
    let result = true;
    this.elements.forEach((depName, index) => {
      if (
        depName.type !== "Identifier" &&
        depName.type !== "Literal" &&
        index !== this.elements.length - 1
      )
        result = false;
    });
    return result;
  }

  getAngularJSComponentDeps(): false | Identifier[] | Literal[] {
    if (!this.isisAngularJSComponentDepsBody()) return false;
    return _.reduce(
      this.elements,
      (depSoFar, dep, index) => {
        if (index == this.elements.length - 1) return depSoFar;
        if (dep.type == "Literal") {
          return [...depSoFar, Identifier.fromJson(dep)];
        } else if (dep.type == "Literal") {
          return [...depSoFar, Identifier.fromJson(dep)];
        }
      },
      []
    );
  }

  static fromJson(jsonData): ArrayExpression {
    return plainToClass(ArrayExpression, jsonData);
  }
}
