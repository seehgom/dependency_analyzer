import "reflect-metadata";
import "es6-shim";
import { classToClass } from 'class-transformer';
import {expect} from 'chai';
import { ArrayExpression } from '../src/types/ArrayExpression';
import * as _ from 'lodash';
import { Identifier } from '../src/types/Identifier';
import { Literal } from '../src/types/Literal';

describe('ArrayExpression empty angular module dependecies test', ()=>{
  it('ArrayExpression should exist', function () {
    const jsonData = {
      "type": "ArrayExpression",
      "elements": []
    };
    const obj: ArrayExpression = ArrayExpression.fromJson(jsonData);
    expect(obj instanceof ArrayExpression).true;
    expect(obj.isisAngularJSComponentDepsBody()).false;
    expect(obj.getAngularJSComponentDeps()).false;
    expect(obj.canBeAngularJSModuleDeps()).true;
    const angularJSModuleDeps = obj.getAngularJSModuleDeps();
    expect(_.isArray(angularJSModuleDeps)).true;
    expect(angularJSModuleDeps).to.be.empty;
  });
  
  it('ArrayExpression single angular module dependency should exist', function () {
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
    expect(obj.isisAngularJSComponentDepsBody()).false;
    expect(obj.getAngularJSComponentDeps()).false;
    expect(obj.canBeAngularJSModuleDeps()).true;
    const angularJSModuleDeps: false | Identifier[] | Literal[] = obj.getAngularJSModuleDeps();
    expect(_.isArray(angularJSModuleDeps)).true;
    expect(angularJSModuleDeps[0].type=="Literal").true;
    expect(angularJSModuleDeps[0].value=="one").true;
    
  });
  
  it('ArrayExpression angular controller body should exist', function () {
    const jsonData = {
      "type": "ArrayExpression",
      "elements": [
        {
          "type": "Literal",
          "value": "$scope",
          "raw": "\"$scope\""
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
    };
    const obj: ArrayExpression = ArrayExpression.fromJson(jsonData);
    expect(obj instanceof ArrayExpression).true;
    expect(obj.isisAngularJSComponentDepsBody()).true;
    const ComponentDependencies: false | Literal[] | Identifier[] = obj.getAngularJSComponentDeps();
    const OnlyDependency  = ComponentDependencies[0];
    expect(OnlyDependency.type=="Literal").true;
    expect(OnlyDependency.value=="$scope").true;
    expect(obj.canBeAngularJSModuleDeps()).false;
    expect(obj.getAngularJSModuleDeps()).false;
  });
});
