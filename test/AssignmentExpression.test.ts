import { AssignmentExpression } from '../src/types/AssignmentExpression';
import {expect} from 'chai';
import * as _ from 'lodash';
import { Identifier } from '../src/types/Identifier';
import { FunctionDeclaration } from '../src/types/FunctionDeclaration';
import { RootContext } from '../src';
import { Literal } from '../src/types/Literal';
import { VariableDeclarator } from '../src/types/VariableDeclarator';
import { FunctionExpression } from '../src/types/FunctionExpression';

describe("AssignmentExpression test", ()=>{
  describe('AssignmentExpression for module exporting an array with function declaration', ()=>{
    beforeEach(()=>{
      RootContext.initializeContext("AssignmentExpression test");
      const jsonData ={
        "type": "FunctionDeclaration",
        "id": {
          "type": "Identifier",
          "name": "Ctrl"
        },
        "params": [
          {
            "type": "Identifier",
            "name": "$scope"
          }
        ],
        "defaults": [],
        "body": {
          "type": "BlockStatement",
          "body": []
        },
        "generator": false,
        "expression": false
      };
      const obj: FunctionDeclaration = FunctionDeclaration.fromJson(jsonData);
    });
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
      const exportArray = obj.getAngularJSComponentExportArray();
      const lastExportedElement = _.last(exportArray);
      expect(lastExportedElement instanceof FunctionDeclaration).true;
      if(lastExportedElement instanceof FunctionDeclaration){
        const depIdentifierNames = _.dropRight(exportArray);
        const functionParameterNames = lastExportedElement.params;
        expect(functionParameterNames.length).eq(depIdentifierNames.length);
        for (let i = 0; i<depIdentifierNames.length; i++){
          expect((<Literal>depIdentifierNames[i]).value).eq(functionParameterNames[i].name);
        }
      }
    });
  });
  
  describe('AssignmentExpression for module exporting an array with function expression variable', ()=>{
    beforeEach(()=>{
      RootContext.initializeContext("AssignmentExpression test2");
      const jsonData ={
        "type": "VariableDeclarator",
        "id": {
          "type": "Identifier",
          "name": "Ctrl"
        },
        "init": {
          "type": "FunctionExpression",
          "id": null,
          "params": [
            {
              "type": "Identifier",
              "name": "$scope"
            }
          ],
          "defaults": [],
          "body": {
            "type": "BlockStatement",
            "body": []
          },
          "generator": false,
          "expression": false
        }
      };
      const obj: VariableDeclarator = VariableDeclarator.fromJson(jsonData);
    });
    it("AssignmentExpression exists 2",()=>{
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
      const exportArray = obj.getAngularJSComponentExportArray();
      const lastExportedElement = _.last(exportArray);
      expect(lastExportedElement instanceof FunctionExpression).true;
      if(lastExportedElement instanceof FunctionExpression){
        const depIdentifierNames = _.dropRight(exportArray);
        const functionParameterNames = lastExportedElement.params;
        expect(functionParameterNames.length).eq(depIdentifierNames.length);
        for (let i = 0; i<depIdentifierNames.length; i++){
          expect((<Literal>depIdentifierNames[i]).value).eq(functionParameterNames[i].name);
        }
      }
    });
  });
  
  describe('AssignmentExpression for module exporting an array with function expression variable', ()=>{
    beforeEach(()=>{
      RootContext.initializeContext("AssignmentExpression test3");
      // const jsonData ={
      //   "type": "VariableDeclarator",
      //   "id": {
      //     "type": "Identifier",
      //     "name": "Ctrl"
      //   },
      //   "init": {
      //     "type": "FunctionExpression",
      //     "id": null,
      //     "params": [
      //       {
      //         "type": "Identifier",
      //         "name": "$scope"
      //       }
      //     ],
      //     "defaults": [],
      //     "body": {
      //       "type": "BlockStatement",
      //       "body": []
      //     },
      //     "generator": false,
      //     "expression": false
      //   }
      // };
      // const obj: VariableDeclarator = VariableDeclarator.fromJson(jsonData);
    });
    it("AssignmentExpression exists 3",()=>{
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
              "type": "FunctionExpression",
              "id": null,
              "params": [
                {
                  "type": "Identifier",
                  "name": "$scope"
                }
              ],
              "defaults": [],
              "body": {
                "type": "BlockStatement",
                "body": []
              },
              "generator": false,
              "expression": false
            }
          ]
        }
      };
      const obj = AssignmentExpression.fromJson(jsonData);
      expect(obj instanceof AssignmentExpression).true;
      expect(obj.isAngularJSComponentExportArray()).true;
      const exportArray = obj.getAngularJSComponentExportArray();
      const lastExportedElement = _.last(exportArray);
      expect(lastExportedElement instanceof FunctionExpression).true;
      if(lastExportedElement instanceof FunctionExpression){
        const depIdentifierNames = _.dropRight(exportArray);
        const functionParameterNames = lastExportedElement.params;
        expect(functionParameterNames.length).eq(depIdentifierNames.length);
        for (let i = 0; i<depIdentifierNames.length; i++){
          expect((<Literal>depIdentifierNames[i]).value).eq(functionParameterNames[i].name);
        }
      }
    });
  });
  
});
