import {CallExpressionNode} from './CallExpressionNode';
import {IdentifierExpressionNode} from './IdentifierExpressionNode';
import { NodeExpression } from './NodeExpression';
import { plainToClass, Type } from 'class-transformer';

export class MemberExpressionNode extends NodeExpression {
  type: "MemberExpression" = "MemberExpression";
  computed?: boolean;
  @Type(() => NodeExpression, {
    discriminator: {
      property: "type",
      subTypes: [
        { value: IdentifierExpressionNode, name: "Identifier" },
        { value: CallExpressionNode, name: "CallExpression" }
      ]
    }
  })
  object!: CallExpressionNode | IdentifierExpressionNode;
  @Type(() => IdentifierExpressionNode)
  property!: IdentifierExpressionNode;
  
  static fromJson(jsonData): MemberExpressionNode {
    return plainToClass(MemberExpressionNode, jsonData);
  }
  
  isAngularJSModuleDeclaration(): boolean {
    if(this.property.type == "Identifier" && this.property.name == "module" &&  this.object.getParent() == "angular"){
      return true;
    }
    return false;
  }
  
  isAngularJSControllerDeclaration(): boolean {
    if(this.property.type == "Identifier" && this.property.name == "controller" && this.object.getParent() == "angular"){
      return true;
    }
    return false;
  }
  
  getParent(): string {
    if(this.object instanceof IdentifierExpressionNode) {
      return this.object.name;
    } else {
      return this.object.getParent();
    }
    
  }
  
  isRootMemberExpression() {
    return this.object.type == "Identifier";
  }
}
