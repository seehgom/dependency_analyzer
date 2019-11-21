import "reflect-metadata";
import "es6-shim";
import {expect} from 'chai';
import { MemberExpression } from '../src/types/MemberExpression';


describe('MemberExpression test', ()=>{
  it('MemberExpression should exist', ()=>{
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
    const obj: MemberExpression = MemberExpression.fromJson(jsonData);
    expect(obj instanceof MemberExpression).true;
  });
  it('MemberExpression 2 should exist', ()=>{
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
    const obj: MemberExpression = MemberExpression.fromJson(jsonData);
    expect(obj instanceof MemberExpression).true;
  })
  it('MemberExpression 3 should exist', ()=>{
    const jsonData = {
      "type": "MemberExpression",
      "computed": false,
      "object": {
        "type": "CallExpression",
        "callee": {
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
        },
        "arguments": [
          {
            "type": "Literal",
            "value": "another",
            "raw": "\"another\""
          }
        ]
      },
      "property": {
        "type": "Identifier",
        "name": "controller"
      }
    };
    const obj: MemberExpression = MemberExpression.fromJson(jsonData);
    expect(obj instanceof MemberExpression).true;
  })
});
