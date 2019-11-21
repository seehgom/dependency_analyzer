import "reflect-metadata";
import "es6-shim";
import { classToClass } from "class-transformer";
import { expect } from "chai";
import { BlockStatement } from "../src/types/BlockStatement";
import { ArrayExpression } from "../src/types/ArrayExpression";
describe("BlockStatement test", () => {
  it("BlockStatement should exist", () => {
    const jsonData = {
      type: "BlockStatement",
      body: []
    };
    const obj: BlockStatement = BlockStatement.fromJson(jsonData);
    expect(obj instanceof BlockStatement).true;
  });
  it("BlockStatement 2 should exist", () => {
    const jsonData = {
      "type": "BlockStatement",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "CallExpression",
            "callee": {
              "type": "Identifier",
              "name": "angularModule"
            },
            "arguments": [
              {
                "type": "Literal",
                "value": "ng",
                "raw": "'ng'"
              }
            ]
          }
        }
      ]
    };
    const obj: BlockStatement = BlockStatement.fromJson(jsonData);
    expect(obj instanceof BlockStatement).true;
  });
});
