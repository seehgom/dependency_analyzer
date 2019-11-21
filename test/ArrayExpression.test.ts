import "reflect-metadata";
import "es6-shim";
import { classToClass } from 'class-transformer';
import {expect} from 'chai';
import { ArrayExpression } from '../src/types/ArrayExpression';


describe('ArrayExpression test', ()=>{
  it('ArrayExpression should exist', function () {
    const jsonData = {
      "type": "ArrayExpression",
      "elements": []
    };
    const obj: ArrayExpression = ArrayExpression.fromJson(jsonData);
    expect(obj instanceof ArrayExpression).true;
  });
  
  it('ArrayExpression 2 should exist', function () {
    const jsonData = {
      "type": "ArrayExpression",
      "elements": [
        {
          "type": "Literal",
          "value": "one",
          "raw": "\"one\""
        }
      ]
    };
    const obj: ArrayExpression = ArrayExpression.fromJson(jsonData);
    expect(obj instanceof ArrayExpression).true;
  });
});
