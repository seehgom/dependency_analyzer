import {CallExpressionNode} from '../src/types/CallExpressionNode';
import { expect } from 'chai';

describe('AwesomeLibrary', () => {
  
  it('should create an instance', () => {
    const value = new CallExpressionNode();
    expect(value).instanceOf(CallExpressionNode);
  });
  
});
