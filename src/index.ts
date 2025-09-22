// Reexport the native module. On web, it will be resolved to ExpoCoreSpotlightModule.web.ts
// and on native platforms to ExpoCoreSpotlightModule.ts
export { default } from './ExpoCoreSpotlightModule';
export { default as ExpoCoreSpotlightView } from './ExpoCoreSpotlightView';
export * from  './ExpoCoreSpotlight.types';
