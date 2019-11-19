import "reflect-metadata";
import "es6-shim";
import {plainToClass} from 'class-transformer';
import { IdentifierExpressionNode } from '../src/types/IdentifierExpressionNode';
import {expect} from 'chai';
import instantiate = WebAssembly.instantiate;

describe('IdentifierExpressionNode test', ()=>{
  it('should IdentifierExpressionNode class exit', function () {
    const jsonData = {
      "type": "Identifier",
      "name": "moduleName"
    };
    const obj: IdentifierExpressionNode = plainToClass(IdentifierExpressionNode, jsonData);
    expect(obj instanceof IdentifierExpressionNode).to.be.true;
  });
});
