import { FunctionDeclaration } from '../src/types/FunctionDeclaration';
import {expect} from 'chai';
import instantiate = WebAssembly.instantiate;
import { RootContext } from '../src';

describe('FunctionDeclaration test', ()=>{
  it('FunctionDeclaration should exist', ()=>{
    RootContext.initializeContext("FunctionDeclaration test");
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
    expect(obj instanceof FunctionDeclaration).true;
    expect(obj.params[0].name).eq("$scope");
  });
});
