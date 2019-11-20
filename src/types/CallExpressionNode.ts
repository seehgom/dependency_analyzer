import {MemberExpressionNode} from './MemberExpressionNode';
import {IdentifierExpressionNode} from './IdentifierExpressionNode';
import {LiteralExpressionNode} from './LiteralExpressionNode';
import {ArrayExpression} from './ArrayExpression';
import {FunctionExpressionNode} from './FunctionExpressionNode';
import { NodeExpression } from './NodeExpression';
import { plainToClass, Type } from 'class-transformer';
export class CallExpressionNode extends NodeExpression {
  type: "CallExpression" = "CallExpression";
  @Type(() => NodeExpression, {
    discriminator: {
      property: "type",
      subTypes: [
        { value: IdentifierExpressionNode, name: "Identifier" },
        { value: MemberExpressionNode, name: "MemberExpression" }
      ]
    }
  })
  callee!: MemberExpressionNode | IdentifierExpressionNode;
  @Type(() => NodeExpression, {
    discriminator: {
      property: "type",
      subTypes: [
        { value: LiteralExpressionNode, name: "Literal" },
        { value: IdentifierExpressionNode, name: "Identifier" },
        { value: FunctionExpressionNode, name: "FunctionExpression" },
        { value: CallExpressionNode, name: "CallExpression" },
        { value: ArrayExpression, name: "ArrayExpression" }
      ]
    }
  })
  arguments!: [IdentifierExpressionNode | LiteralExpressionNode, ArrayExpression |CallExpressionNode | FunctionExpressionNode ];
  
  
  getParent(): string {
    if(this.callee instanceof IdentifierExpressionNode){
      return this.callee.name;
    } else {
      return this.callee.getParent();
    }
  }
  isRootCallExpression(): boolean {
    return this.callee.isRootMemberExpression();
  }
  getParentModule(): IdentifierExpressionNode | LiteralExpressionNode | boolean {
    if(this.callee instanceof IdentifierExpressionNode){
      return false;
    } else if (this.isRootCallExpression()) {
      return this.arguments[0];
    } else {
      return this.callee instanceof MemberExpressionNode && this.callee.object instanceof CallExpressionNode
        ? this.callee.object.getParentModule()
        : false;
    }
  }
  isAngularJSModuleDeclaration(): boolean {
    return this.callee.isAngularJSModuleDeclaration();
  }
  getAngularJSModuleName(): IdentifierExpressionNode | LiteralExpressionNode | boolean {
    if(this.isAngularJSModuleDeclaration()){
      return this.arguments[0];
    }
    return false;
  }
  isAngularJSControllerDeclaration(): boolean {
    return this.callee.isAngularJSControllerDeclaration();
  }
  getAngularJSControllerName(): IdentifierExpressionNode | LiteralExpressionNode | boolean {
    if(this.isAngularJSControllerDeclaration()){
      return this.arguments[0];
    }
    return false;
  }
  
  static fromJson( jsonData ): CallExpressionNode {
    return plainToClass(CallExpressionNode, jsonData);
  }
}
