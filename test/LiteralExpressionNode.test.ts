import "reflect-metadata";
import "es6-shim";
import {plainToClass} from 'class-transformer';
import {expect} from 'chai';

import { Literal } from '../src/types/Literal';

describe('Literal', () => {
  it('should be able to create Literal object', function () {
    const jsonData = {
      "type": "Literal",
      "value": "test",
      "raw": "\"test\""
    };
    const converted: Literal = plainToClass(Literal, jsonData);
    expect(converted instanceof Literal).true;
  });
});
