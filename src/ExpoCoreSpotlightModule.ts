import { NativeModule, requireNativeModule } from 'expo';

declare class ExpoCoreSpotlightModule extends NativeModule {
  indexItem(item: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoCoreSpotlightModule>('ExpoCoreSpotlight');
