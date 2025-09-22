import { NativeModule, requireNativeModule } from 'expo';

import { ExpoCoreSpotlightModuleEvents } from './ExpoCoreSpotlight.types';

declare class ExpoCoreSpotlightModule extends NativeModule<ExpoCoreSpotlightModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoCoreSpotlightModule>('ExpoCoreSpotlight');
