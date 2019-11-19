import "reflect-metadata";
import "es6-shim";
import {plainToClass} from 'class-transformer';
import {expect} from 'chai';

import { VariableInitializationExpressionNode } from '../src/types/VariableInitializationExpressionNode';
import { IdentifierExpressionNode } from '../src/types/IdentifierExpressionNode';
import { LiteralExpressionNode } from '../src/types/LiteralExpressionNode';

describe('VariableInitializationExpressionNode test', ()=>{
  it('should VariableInitializationExpressionNode exist', function () {
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
    const obj : VariableInitializationExpressionNode = plainToClass(VariableInitializationExpressionNode, jsonData);
    expect(obj instanceof VariableInitializationExpressionNode).to.be.true;
    expect(obj.id instanceof IdentifierExpressionNode).to.be.true;
    expect(obj.init instanceof LiteralExpressionNode).to.be.true;
  });
});

