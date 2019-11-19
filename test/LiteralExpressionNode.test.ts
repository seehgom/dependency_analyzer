import "reflect-metadata";
import "es6-shim";
import {plainToClass} from 'class-transformer';
import {expect} from 'chai';

import { LiteralExpressionNode } from '../src/types/LiteralExpressionNode';

describe('LiteralExpressionNode', () => {
  it('should be able to create LiteralExpressionNode object', function () {
    const jsonData = {
      "type": "Literal",
      "value": "test",
      "raw": "\"test\""
    };
    const converted: LiteralExpressionNode = plainToClass(LiteralExpressionNode, jsonData);
    expect(converted instanceof LiteralExpressionNode).true;
  });
});
