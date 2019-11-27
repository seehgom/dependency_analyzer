import "reflect-metadata";
import "es6-shim";
import { classToClass, plainToClass } from 'class-transformer';
import {expect} from 'chai';

import { Identifier } from '../src/types/Identifier';
import { Literal } from '../src/types/Literal';
import { VariableDeclarator } from '../src/types/VariableDeclarator';
import { IdentifierStorage } from '../src/uitility/IdentifierStorage';

describe('VariableDeclarator test', ()=>{
  it('VariableDeclarator initialization should exist', ()=>{
    const jsonData = {
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
    };
    const obj: VariableDeclarator = plainToClass(VariableDeclarator, jsonData);
    expect(obj instanceof VariableDeclarator).to.be.true;
    expect(obj.isInitalization()).to.be.true;
    expect(obj.isLiteralInitalization()).true;
  });
  it('should VariableDeclarator exist', function () {
    const jsonData = {
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
    };
    const obj : VariableDeclarator = plainToClass(VariableDeclarator, jsonData);
    expect(obj instanceof VariableDeclarator).to.be.true;
    expect(obj.id instanceof Identifier).to.be.true;
    expect(obj.init instanceof Literal).to.be.true;
  });
  it('object VariableDeclarator and initialization should exist', ()=>{
    const jsonData = {
      "type": "VariableDeclarator",
      "id": {
        "type": "Identifier",
        "name": "jquery"
      },
      "init": {
        "type": "ObjectExpression",
        "properties": []
      }
    };
    const obj: VariableDeclarator = plainToClass(VariableDeclarator, jsonData);
    expect(obj instanceof VariableDeclarator).to.be.true;
    expect(obj.isInitalization()).to.be.true;
    expect(obj.isLiteralInitalization()).false;
  });
  it('variable VariableDeclarator containing initialization should exist', ()=>{
    const jsonData = {
      "type": "VariableDeclarator",
      "id": {
        "type": "Identifier",
        "name": "jquery"
      },
      "init": {
        "type": "ObjectExpression",
        "properties": []
      }
    };
    const obj: VariableDeclarator = plainToClass(VariableDeclarator, jsonData);
    expect(obj instanceof VariableDeclarator).to.be.true;
    expect(obj.isInitalization()).to.be.true;
    expect(obj.isLiteralInitalization()).false;
  });
  it('variable VariableDeclarator containing require statement should exist', ()=>{
    const jsonData = {
      "type": "VariableDeclarator",
      "id": {
        "type": "Identifier",
        "name": "ctrlName"
      },
      "init": {
        "type": "CallExpression",
        "callee": {
          "type": "Identifier",
          "name": "require"
        },
        "arguments": [
          {
            "type": "Literal",
            "value": "ctrlSrc",
            "raw": "\"ctrlSrc\""
          }
        ]
      }
    };
    const obj: VariableDeclarator = plainToClass(VariableDeclarator, jsonData);
    expect(obj instanceof VariableDeclarator).to.be.true;
    expect(obj.isInitalization()).to.be.true;
    expect(obj.isLiteralInitalization()).false;
    const id = plainToClass(Identifier, {
      "type": "Literal",
      "value": "ctrlName",
      "raw": "\"ctrlName\""
    });
    const literalValue = IdentifierStorage.getIdentifierValue(id);
    expect(literalValue instanceof Literal).true;
    if(literalValue instanceof Literal){
      expect(literalValue.value).eq("ctrlSrc");
    } else {
      expect(true).false;
    }
  });
});

