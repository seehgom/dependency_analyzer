import "reflect-metadata";
import "es6-shim";
import {plainToClass} from 'class-transformer';
import {expect} from 'chai';
import { VariableDeclarationExpressionNode } from '../src/types/VariableDeclarationExpressionNode';

describe('VariableDeclarationExpressionNode test', ()=>{
  it('VariableDeclarationExpressionNode initialization should exist', ()=>{
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
    const obj: VariableDeclarationExpressionNode = plainToClass(VariableDeclarationExpressionNode, jsonData);
    expect(obj instanceof VariableDeclarationExpressionNode).to.be.true;
    expect(obj.isInitalization()).to.be.true;
  });
  it('VariableDeclarationExpressionNode declaration and initialization should exist', ()=>{
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
    const obj: VariableDeclarationExpressionNode = plainToClass(VariableDeclarationExpressionNode, jsonData);
    expect(obj instanceof VariableDeclarationExpressionNode).to.be.true;
    expect(obj.isInitalization()).to.be.false;
  });
  
});
