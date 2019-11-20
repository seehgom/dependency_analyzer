import "reflect-metadata";
import "es6-shim";
import {expect} from 'chai';
import { MemberExpressionNode } from '../src/types/MemberExpressionNode';


describe('MemberExpressionNode test', ()=>{
  it('MemberExpressionNode should exist', ()=>{
    const jsonData = {
      "type": "MemberExpression",
      "computed": false,
      "object": {
        "type": "Identifier",
        "name": "angular"
      },
      "property": {
        "type": "Identifier",
        "name": "module"
      }
    };
    const obj: MemberExpressionNode = MemberExpressionNode.fromJson(jsonData);
    expect(obj instanceof MemberExpressionNode).true;
  })
})
