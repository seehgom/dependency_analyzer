import { CallExpression } from "./CallExpression";
import { NodeExpression } from "./NodeExpression";
import { plainToClass, Type } from "class-transformer";
import * as _ from "lodash";
export class ExpressionStatement implements NodeExpression {
  type: "ExpressionStatement" = "ExpressionStatement";
  @Type(() => CallExpression) private _expression!: CallExpression;

  get expression(): CallExpression {
    return this._expression;
  }

  set expression(value: CallExpression) {
    if (_.isNil(value) || value.type !== "CallExpression")
      throw new Error(
        "ExpressionStatement should contain a call expression, but is " + JSON.stringify(value)
      );
    this._expression = CallExpression.fromJson(value);
  }

  static fromJson(jsonData) {
    return plainToClass(ExpressionStatement, jsonData);
  }
}
