import { AssignmentExpression } from '../src/types/AssignmentExpression';
import {expect} from 'chai';


describe("AssignmentExpression test", ()=>{
  it("AssignmentExpression exists",()=>{
    const jsonData = {
      "type": "AssignmentExpression",
      "operator": "=",
      "left": {
        "type": "MemberExpression",
        "computed": false,
        "object": {
          "type": "Identifier",
          "name": "module"
        },
        "property": {
          "type": "Identifier",
          "name": "exports"
        }
      },
      "right": {
        "type": "ArrayExpression",
        "elements": [
          {
            "type": "Literal",
            "value": "$scope",
            "raw": "'$scope'"
          },
          {
            "type": "Identifier",
            "name": "Ctrl"
          }
        ]
      }
    };
    const obj = AssignmentExpression.fromJson(jsonData);
    expect(obj instanceof AssignmentExpression).true;
    expect(obj.isAngularJSComponentExportArray()).true;
  })
})
