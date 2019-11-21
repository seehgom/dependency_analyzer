import "reflect-metadata";
import "es6-shim";
import {plainToClass} from 'class-transformer';
import {expect} from 'chai';
import { VariableDeclaration } from '../src/types/VariableDeclaration';

describe('VariableDeclaration test', ()=>{
  it('VariableDeclaration initialization should exist', ()=>{
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
    const obj: VariableDeclaration = plainToClass(VariableDeclaration, jsonData);
    expect(obj instanceof VariableDeclaration).to.be.true;
    expect(obj.isInitalization()).to.be.true;
    expect(obj.isLiteralInitalization()).true;
  });
  it('VariableDeclaration declaration and initialization should exist', ()=>{
    const jsonData = {
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
    };
    const obj: VariableDeclaration = plainToClass(VariableDeclaration, jsonData);
    expect(obj instanceof VariableDeclaration).to.be.true;
    expect(obj.isInitalization()).to.be.false;
    expect(obj.isLiteralInitalization()).false;
  });
  
  it('object declaration should exist', ()=>{
    const jsonData = {
      "type": "Identifier",
      "name": "jquery"
    };
    const obj: VariableDeclaration = plainToClass(VariableDeclaration, jsonData);
    expect(obj instanceof VariableDeclaration).to.be.true;
    expect(obj.isInitalization()).to.be.false;
  });
  
  it('object declaration and initialization should exist', ()=>{
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
    const obj: VariableDeclaration = plainToClass(VariableDeclaration, jsonData);
    expect(obj instanceof VariableDeclaration).to.be.true;
    expect(obj.isInitalization()).to.be.true;
    expect(obj.isLiteralInitalization()).false;
  });
  it('variable declaration containing initialization should exist', ()=>{
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
    const obj: VariableDeclaration = plainToClass(VariableDeclaration, jsonData);
    expect(obj instanceof VariableDeclaration).to.be.true;
    expect(obj.isInitalization()).to.be.true;
    expect(obj.isLiteralInitalization()).false;
  });
  
});
