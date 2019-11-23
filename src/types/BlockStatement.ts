import { NodeExpression } from "./NodeExpression";
import { ExpressionStatement } from "./ExpressionStatement";
import { plainToClass, Type } from "class-transformer";
import * as _ from "lodash";
export class BlockStatement implements NodeExpression {
  type: "BlockStatement" = "BlockStatement";
  @Type(() => ExpressionStatement) private _body!: ExpressionStatement[];

  get body(): ExpressionStatement[] {
    return this._body;
  }

  set body(value: ExpressionStatement[]) {
    if (_.isNil(value))
      throw new Error("BlockStatement's body cannot be undefined, is " + JSON.stringify(value));
    this._body = _.isEmpty(value)
      ? []
      : _.reduce(
          value,
          (bodySoFar, nextStatement) => {
            if (nextStatement.type == "ExpressionStatement") {
              return [
                ...bodySoFar,
                ExpressionStatement.fromJson(nextStatement)
              ];
            } else {
              throw new Error(
                "Block statement must only contain ExpressionStatements, but is " +
                  JSON.stringify(nextStatement)
              );
            }
          },
          []
        );
  }

  constructor(type: "BlockStatement", body: ExpressionStatement[]) {
    this.type = "BlockStatement";
    this._body = body;
  }

  static fromJson(jsonData) {
    return plainToClass(BlockStatement, jsonData);
  }
}
