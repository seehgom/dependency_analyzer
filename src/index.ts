// This is the library entry point
import { IdentifierStorage } from './uitility/IdentifierStorage';

declare global {
  function initializeContext(context: string): void;
}
const _global = (window /* browser */ || global /* node */) as any
_global.initializeContext = function initializeContext(context: string) {
  IdentifierStorage.initializeContext(context);
};

export {};
