import "reflect-metadata";
import "es6-shim";
import { classToClass } from 'class-transformer';
import {expect} from 'chai';
import {ExpressionStatement} from '../src/types/ExpressionStatement';
import { Identifier } from '../src/types/Identifier';

describe('ExpressionStatement test', () => {
  
  it('ExpressionStatement should create an instance', () => {
    const jsonData ={
      "type": "ExpressionStatement",
      "expression": {
        "type": "CallExpression",
        "callee": {
          "type": "MemberExpression",
          "computed": false,
          "object": {
            "type": "Identifier",
            "name": "angular"
          },
          "property": {
            "type": "Identifier",
            "name": "module"
          }
        },
        "arguments": [
          {
            "type": "Identifier",
            "name": "moduleName"
          },
          {
            "type": "ArrayExpression",
            "elements": []
          }
        ]
      }
    };
    const obj: ExpressionStatement = ExpressionStatement.fromJson(jsonData);
    expect(obj instanceof ExpressionStatement).true;
  });
  it('ExpressionStatement 2 should create an instance', () => {
    const jsonData ={
      "type": "ExpressionStatement",
      "expression": {
        "type": "CallExpression",
        "callee": {
          "type": "MemberExpression",
          "computed": false,
          "object": {
            "type": "Identifier",
            "name": "angular"
          },
          "property": {
            "type": "Identifier",
            "name": "module"
          }
        },
        "arguments": [
          {
            "type": "Literal",
            "value": "test",
            "raw": "\"test\""
          },
          {
            "type": "ArrayExpression",
            "elements": [
              {
                "type": "Literal",
                "value": "one",
                "raw": "\"one\""
              }
            ]
          }
        ]
      }
    };
    const obj: ExpressionStatement = ExpressionStatement.fromJson(jsonData);
    expect(obj instanceof ExpressionStatement).true;
  });
});
