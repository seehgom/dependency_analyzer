// This is the library entry point
import { IdentifierStorage } from './uitility/IdentifierStorage';

export class RootContext {
  static initializeContext(context: string) {
    IdentifierStorage.initializeContext(context);
  }
}
