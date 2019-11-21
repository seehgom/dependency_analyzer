import "reflect-metadata";
import "es6-shim";
import {plainToClass} from 'class-transformer';
import { Identifier } from '../src/types/Identifier';
import {expect} from 'chai';
import instantiate = WebAssembly.instantiate;

describe('Identifier test', ()=>{
  it('should Identifier class exit', function () {
    const jsonData = {
      "type": "Identifier",
      "name": "moduleName"
    };
    const obj: Identifier = plainToClass(Identifier, jsonData);
    expect(obj instanceof Identifier).to.be.true;
  });
});
