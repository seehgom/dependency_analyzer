import "reflect-metadata";
import "es6-shim";
import { classToClass } from 'class-transformer';
import {expect} from 'chai';
import {CallExpression} from '../src/types/CallExpression';
import { Identifier } from '../src/types/Identifier';
import { Literal } from '../src/types/Literal';
import { IdentifierStorage } from '../src/uitility/IdentifierStorage';

describe('CallExpression test', () => {
  
  it('CallExpression should create an instance', () => {
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
    const objId: Identifier = Identifier.fromJson(identifierJson);
    const obj: CallExpression = CallExpression.fromJson(jsonData);
    expect(obj instanceof CallExpression).true;
    expect(obj.isAngularJSModuleDeclaration()).true;
    const parentModule: Identifier = classToClass(<Identifier>obj.getAngularJSModuleName());
    expect(parentModule.type).to.eq("Identifier");
    expect(obj.isAngularJSComponentDeclaration()).false;
    expect(obj.getAngularJSComponentName()).false;
  });
  
  it('CallExpression should create an instance angular module declaration', () => {
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
        },
        {
          "type": "ArrayExpression",
          "elements": []
        }
      ]
    };
    const obj: CallExpression = CallExpression.fromJson(jsonData);
    expect(obj instanceof CallExpression).true;
    expect(obj.isAngularJSModuleDeclaration()).true;
    const parentModule: Identifier = classToClass(<Identifier>obj.getAngularJSModuleName());
    expect(parentModule.type).to.eq("Identifier");
    expect(obj.isAngularJSComponentDeclaration()).false;
    expect(obj.getAngularJSComponentName()).false;
  });
  
  it('CallExpression 2 should create an instance angular module declaration', () => {
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
          "type": "Literal",
          "value": "test",
          "raw": "\"test\""
        },
        {
          "type": "ArrayExpression",
          "elements": []
        }
      ]
    };
    const obj: CallExpression = CallExpression.fromJson(jsonData);
    expect(obj instanceof CallExpression).true;
    expect(obj.isAngularJSModuleDeclaration()).true;
    const parentModule: Literal = classToClass(<Literal>obj.getAngularJSModuleName());
    expect(parentModule.type).to.eq("Literal");
    expect(parentModule.value).to.eq("test");
    expect(obj.isAngularJSComponentDeclaration()).false;
    expect(obj.getAngularJSComponentName()).false;
  });
  it('CallExpression 3 should create an instance angular module declaration', () => {
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
          "type": "Literal",
          "value": "another",
          "raw": "\"another\""
        }
      ]
    };
    const obj: CallExpression = CallExpression.fromJson(jsonData);
    expect(obj instanceof CallExpression).true;
    expect(obj.isAngularJSModuleDeclaration()).true;
    const parentModule: Literal = classToClass(<Literal>obj.getAngularJSModuleName());
    expect(parentModule.type).to.eq("Literal");
    expect(parentModule.value).to.eq("another");
    expect(obj.isAngularJSComponentDeclaration()).false;
    expect(obj.getAngularJSComponentName()).false;
  });
  
  
  it('CallExpression 4 should create an instance angular module declaration', () => {
    IdentifierStorage.initializeContext("CallExpression");
    const jsonData = {
      "type": "CallExpression",
      "callee": {
        "type": "Identifier",
        "name": "require"
      },
      "arguments": [
        {
          "type": "Literal",
          "value": "ctrlName",
          "raw": "\"ctrlName\""
        }
      ]
    };
    const obj: CallExpression = CallExpression.fromJson(jsonData);
    expect(obj instanceof CallExpression).true;
    expect(obj.isAngularJSModuleDeclaration()).false;
    const parentModule: Literal = classToClass(<Literal>obj.getAngularJSModuleName());
    expect(parentModule.type).to.eq("Literal");
    expect(parentModule.value).to.eq("another");
    expect(obj.isAngularJSComponentDeclaration()).false;
    expect(obj.getAngularJSComponentName()).false;
    expect(obj.isRequireStatment()).true;
    expect(obj.getFileImport().source).to.eq("ctrlName")
  });
  
});
