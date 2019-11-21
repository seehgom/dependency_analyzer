import "reflect-metadata";
import "es6-shim";
import {plainToClass} from 'class-transformer';
import {expect} from 'chai';

import { VariableInitializationExpressionNode } from '../src/types/VariableInitializationExpressionNode';
import { Identifier } from '../src/types/Identifier';
import { Literal } from '../src/types/Literal';

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
    expect(obj.id instanceof Identifier).to.be.true;
    expect(obj.init instanceof Literal).to.be.true;
  });
});

