import { FunctionExpression } from "./FunctionExpression";
import { Literal } from "./Literal";
import { Identifier } from "./Identifier";
import { CallExpression } from "./CallExpression";
import { plainToClass, Type } from "class-transformer";
import { NodeExpression } from "./NodeExpression";
import * as _ from "lodash";
import { FileImport } from "./FileImport";
import { ObjectExpression } from "./ObjectExpression";
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
        if (depName.type !== "Literal" && depName.type !== "Identifier") {
          return false;
        }
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

  isAngularJSComponentDepsBody(): boolean {
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

  getAngularJSComponentDeps(): false | Array<Identifier | Literal> {
    if (!this.isAngularJSComponentDepsBody()) return false;
    return _.reduce(
      this.getElementsWithLiterals(),
      (depSoFar, dep, index) => {
        if (index == this.elements.length - 1) return depSoFar;
        if (dep.type == "Literal") {
          return [...depSoFar, Identifier.fromJson(dep)];
        } else if (dep.type == "FileImport") {
          return [...depSoFar, FileImport.fromJson(dep)];
        } else if (dep.type == "ArrayExpression") {
          return [...depSoFar, ArrayExpression.fromJson(dep).getArrayExpressionWithLiterals()];
        } else if (dep.type == "ObjectExpression") {
          return [...depSoFar, ObjectExpression.fromJson(dep)];
        } else if (dep.type == "FunctionExpression") {
          return [...depSoFar, FunctionExpression.fromJson(dep)];
        } else {
          throw new Error("Unexpected element in angularjs component argument, arg="+JSON.stringify(dep));
        }
      },
      []
    );
  }
  
  getElementsWithLiterals(): Array<Literal | FileImport | ArrayExpression | ObjectExpression | FunctionExpression > {
    const arrayRaw = [...this.elements];
    const arrayWithLiterals: Array<Literal | FileImport | ArrayExpression | ObjectExpression | FunctionExpression > = arrayRaw.length==0?[]:_.reduce(arrayRaw, (arraySoFar, element)=>{
      if (element.type=="Identifier") {
        const ElementAsIdentifier = Identifier.fromJson(element);
        const value = ElementAsIdentifier.getValue();
        return [...arraySoFar, value];
      } else {
        return [...arraySoFar, element];
      }
    }, []);
    return arrayWithLiterals;
  }

  getArrayExpressionWithLiterals(): ArrayExpression {
      return new ArrayExpression('ArrayExpression',this.getElementsWithLiterals());
  }

  static fromJson(jsonData): ArrayExpression {
    return plainToClass(ArrayExpression, jsonData);
  }
}
