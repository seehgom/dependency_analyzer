import "reflect-metadata";
import "es6-shim";
import { classToClass } from 'class-transformer';
import {expect} from 'chai';
import { ProgramNode } from '../src/types/ProgramNode';


describe('ProgramNode test', ()=>{
  it('ProgramNode should exist', function () {
    const jsonData = {
      "type": "Program",
      "body": [
        {
          "type": "VariableDeclaration",
          "declarations": [
            {
              "type": "VariableDeclarator",
              "id": {
                "type": "Identifier",
                "name": "moduleName"
              },
              "init": {
                "type": "Literal",
                "value": "test",
                "raw": "\"test\""
              }
            }
          ],
          "kind": "var"
        },
        {
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
        }
      ],
      "sourceType": "module"
    };
    const obj: ProgramNode = ProgramNode.fromJson(jsonData);
    expect(obj instanceof ProgramNode).true;
  });
  it('ProgramNode 2 should exist', function () {
    const jsonData = {
      "type": "Program",
      "body": [
        {
          "type": "VariableDeclaration",
          "declarations": [
            {
              "type": "VariableDeclarator",
              "id": {
                "type": "Identifier",
                "name": "jquery"
              },
              "init": {
                "type": "ObjectExpression",
                "properties": []
              }
            }
          ],
          "kind": "var"
        }
      ],
      "sourceType": "module"
    };
    const obj: ProgramNode = ProgramNode.fromJson(jsonData);
    expect(obj instanceof ProgramNode).true;
  });
});
