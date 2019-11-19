import {CallExpressionNode} from './CallExpressionNode';
import {ExpressionNode} from './ExpressionNode';
import {IdentifierExpressionNode} from './IdentifierExpressionNode';

export class MemberExpressionNode {
  type!: "MemberExpression";
  computed?: boolean;
  object!: CallExpressionNode | IdentifierExpressionNode;
  property!: ExpressionNode;
  
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
