import { registerWebModule, NativeModule } from 'expo';

import { ExpoCoreSpotlightModuleEvents } from './ExpoCoreSpotlight.types';

class ExpoCoreSpotlightModule extends NativeModule<ExpoCoreSpotlightModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoCoreSpotlightModule, 'ExpoCoreSpotlightModule');
