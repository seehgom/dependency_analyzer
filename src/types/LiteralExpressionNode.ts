import { plainToClass } from 'class-transformer';

export class LiteralExpressionNode {
  type!: "Literal";
  value!: string;
  raw!: string;
  
  constructor( type: "Literal", value: string, raw: string ) {
    this.type = type;
    this.value = value;
    this.raw = raw;
  }
  static fromJson(jsonData): LiteralExpressionNode{
    return plainToClass(LiteralExpressionNode, jsonData);
  }
}
