import "reflect-metadata";
import "es6-shim";
import {expect} from 'chai';
import {CallExpressionNode} from '../src/types/CallExpressionNode';
import { IdentifierExpressionNode } from '../src/types/IdentifierExpressionNode';
import { classToClass } from 'class-transformer';

describe('CallExpressionNode test', () => {
  
  it('CallExpressionNode should create an instance', () => {
    const jsonData = {
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
        }
      ]
    };
    const identifierJson = {
      "type": "Identifier",
      "name": "moduleName"
    };
    const objId: IdentifierExpressionNode = IdentifierExpressionNode.fromJson(identifierJson);
    const obj: CallExpressionNode = CallExpressionNode.fromJson(jsonData);
    expect(obj instanceof CallExpressionNode).true;
    expect(obj.isAngularJSModuleDeclaration()).true;
    const parentModule: IdentifierExpressionNode = classToClass(<IdentifierExpressionNode>obj.getAngularJSModuleName());
    expect(parentModule.type).to.eq("Identifier");
    expect(obj.isAngularJSControllerDeclaration()).false;
    expect(obj.getAngularJSControllerName()).false;
  });
  
});
