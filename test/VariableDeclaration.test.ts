import "reflect-metadata";
import "es6-shim";
import {plainToClass} from 'class-transformer';
import {expect} from 'chai';
import { VariableDeclaration } from '../src/types/VariableDeclaration';

describe('VariableDeclaration test', ()=>{
  
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
  });
  
  it('object declaration should exist', ()=>{
    const jsonData = {
      "type": "Identifier",
      "name": "jquery"
    };
    const obj: VariableDeclaration = plainToClass(VariableDeclaration, jsonData);
    expect(obj instanceof VariableDeclaration).to.be.true;
  });
  
  
  
});
